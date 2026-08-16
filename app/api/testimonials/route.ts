import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";

export interface TestimonialItem {
  id?: string;
  quote: string;
  author: string;
  initial: string;
  rating: number;
}

export async function GET() {
  try {
    const testimonials = await Promise.race([
      prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (testimonials && testimonials.length > 0) {
      dataStore.setAuditLogs(testimonials);
      return NextResponse.json(testimonials);
    }
  } catch (error) {}

  return NextResponse.json(dataStore.getTestimonials());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, author, initial, rating } = body;

    if (!quote || !author) {
      return NextResponse.json(
        { error: "Missing required fields (quote, author)" },
        { status: 400 }
      );
    }

    const authorInitial = initial || author.charAt(0).toUpperCase();
    const newTestimonial: TestimonialItem = {
      id: String(Date.now()),
      quote,
      author,
      initial: authorInitial,
      rating: typeof rating === "number" ? rating : 5,
    };

    dataStore.addTestimonial(newTestimonial);

    await logAudit({
      action: "TESTIMONIAL_CREATE",
      details: `Added new testimonial from ${newTestimonial.author} (${newTestimonial.rating}★ rating)`,
    });

    try {
      await prisma.testimonial.create({
        data: {
          quote,
          author,
          initial: authorInitial,
          rating: newTestimonial.rating,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
