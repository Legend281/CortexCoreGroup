import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { number: "asc" },
    });

    // Normalize flat DB testimonial fields into the nested shape the UI expects
    const projects = rawProjects.map((project) => ({
      id: project.id,
      number: project.number,
      category: project.category,
      categoryLabel: project.categoryLabel,
      title: project.title,
      description: project.description,
      image: project.image,
      techStack: project.techStack,
      likeCount: project.likeCount,
      rating: project.rating,
      testimonial:
        project.testimonialQuote
          ? {
              quote: project.testimonialQuote,
              author: project.testimonialAuthor || "",
              role: project.testimonialRole || "",
            }
          : undefined,
      link: project.link,
    }));

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
