import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
