import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { ServiceItem } from "@/data/services";

export async function GET() {
  try {
    const services = await Promise.race([
      prisma.service.findMany({ orderBy: { number: "asc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (services && services.length > 0) {
      dataStore.setServices(services);
      return NextResponse.json(services);
    }
  } catch (error) {}

  return NextResponse.json(dataStore.getServices());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, number, title, description, tags, iconName, image } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields (id, title, description)" },
        { status: 400 }
      );
    }

    const currentServices = dataStore.getServices();
    const newService: ServiceItem = {
      id,
      number: number || `0${currentServices.length + 1}`,
      title,
      description,
      tags: Array.isArray(tags) ? tags : [],
      iconName: iconName || "Code2",
      image: image || null,
    };

    // Update shared data store immediately
    dataStore.upsertService(newService);

    // Record Audit Log Event
    await logAudit({
      action: "SERVICE_CREATE",
      details: `Created new service: "${newService.title}" (#${newService.number}, ID: ${newService.id})`,
    });

    // Try database persistence in background
    try {
      await prisma.service.upsert({
        where: { id },
        update: {
          number: newService.number,
          title: newService.title,
          description: newService.description,
          tags: newService.tags,
          iconName: newService.iconName,
          image: newService.image,
        },
        create: {
          id: newService.id,
          number: newService.number,
          title: newService.title,
          description: newService.description,
          tags: newService.tags,
          iconName: newService.iconName,
          image: newService.image,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/services");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(newService, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create service" },
      { status: 500 }
    );
  }
}
