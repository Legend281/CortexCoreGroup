import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { ServiceItem } from "@/data/services";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const service = await Promise.race([
      prisma.service.findUnique({ where: { id: params.id } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (service) return NextResponse.json(service);
  } catch (error) {}

  const local = dataStore.getServices().find((s) => s.id === params.id);
  if (local) return NextResponse.json(local);

  return NextResponse.json({ error: "Service not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { number, title, description, tags, iconName, image } = body;

    const currentServices = dataStore.getServices();
    const existing = currentServices.find((s) => s.id === params.id);

    const updated: ServiceItem = {
      id: params.id,
      number: number || existing?.number || "01",
      title: title || existing?.title || "",
      description: description || existing?.description || "",
      tags: Array.isArray(tags) ? tags : existing?.tags || [],
      iconName: iconName || existing?.iconName || "Code2",
      image: image !== undefined ? image : existing?.image || null,
    };

    // Update shared data store immediately
    dataStore.upsertService(updated);

    // Record Audit Log Event
    await logAudit({
      action: "SERVICE_UPDATE",
      details: `Updated service: "${updated.title}" (#${updated.number}, ID: ${params.id})`,
    });

    try {
      await prisma.service.update({
        where: { id: params.id },
        data: {
          number: updated.number,
          title: updated.title,
          description: updated.description,
          tags: updated.tags,
          iconName: updated.iconName,
          image: updated.image,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentServices = dataStore.getServices();
    const existing = currentServices.find((s) => s.id === params.id);

    dataStore.deleteService(params.id);

    // Record Audit Log Event
    await logAudit({
      action: "SERVICE_DELETE",
      details: `Deleted service: "${existing?.title || params.id}" (ID: ${params.id})`,
    });

    try {
      await prisma.service.delete({
        where: { id: params.id },
      });
    } catch (_) {}

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Service deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
