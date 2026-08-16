import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const testimonial = await Promise.race([
      prisma.testimonial.findUnique({ where: { id: params.id } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (testimonial) return NextResponse.json(testimonial);
  } catch (error) {}

  const local = dataStore.getTestimonials().find((t: any) => t.id === params.id);
  if (local) return NextResponse.json(local);

  return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { quote, author, initial, rating } = body;

    const updated = {
      id: params.id,
      quote,
      author,
      initial: initial || author?.charAt(0).toUpperCase() || "C",
      rating: typeof rating === "number" ? rating : 5,
    };

    dataStore.updateTestimonial(params.id, updated);

    await logAudit({
      action: "TESTIMONIAL_UPDATE",
      details: `Updated testimonial from ${updated.author} (#${params.id})`,
    });

    try {
      await prisma.testimonial.update({
        where: { id: params.id },
        data: {
          quote,
          author,
          initial: updated.initial,
          rating: updated.rating,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existing = dataStore.getTestimonials().find((t: any) => t.id === params.id);

    dataStore.deleteTestimonial(params.id);

    await logAudit({
      action: "TESTIMONIAL_DELETE",
      details: `Deleted testimonial from ${existing?.author || params.id} (#${params.id})`,
    });

    try {
      await prisma.testimonial.delete({
        where: { id: params.id },
      });
    } catch (_) {}

    try {
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
