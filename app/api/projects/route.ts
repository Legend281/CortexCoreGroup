import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { ProjectItem } from "@/data/projects";

export async function GET() {
  try {
    const rawProjects = await Promise.race([
      prisma.project.findMany({ orderBy: { number: "asc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);

    if (rawProjects && rawProjects.length > 0) {
      const projects = rawProjects.map((project: any) => ({
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
        testimonial: project.testimonialQuote
          ? {
              quote: project.testimonialQuote,
              author: project.testimonialAuthor || "",
              role: project.testimonialRole || "",
            }
          : undefined,
        link: project.link,
      }));
      dataStore.setProjects(projects);
      return NextResponse.json(projects);
    }
  } catch (error) {}

  return NextResponse.json(dataStore.getProjects());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      number,
      category,
      categoryLabel,
      title,
      description,
      image,
      techStack,
      likeCount,
      rating,
      testimonialQuote,
      testimonialAuthor,
      testimonialRole,
      link,
    } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields (id, title, description)" },
        { status: 400 }
      );
    }

    const currentProjects = dataStore.getProjects();
    const newProject: ProjectItem = {
      id,
      number: number || `0${currentProjects.length + 1}`,
      category: category || "Enterprise Web Apps",
      categoryLabel: categoryLabel || "FLAGSHIP SAAS",
      title,
      description,
      image: image || "/images/projects/default.png",
      techStack: Array.isArray(techStack) ? techStack : [],
      likeCount: typeof likeCount === "number" ? likeCount : 0,
      rating: typeof rating === "number" ? rating : 5,
      testimonial: testimonialQuote
        ? {
            quote: testimonialQuote,
            author: testimonialAuthor || "",
            role: testimonialRole || "",
          }
        : undefined,
      link: link || `/our-work/${id}`,
    };

    dataStore.upsertProject(newProject);

    await logAudit({
      action: "PROJECT_CREATE",
      details: `Created new portfolio project: "${newProject.title}" (${newProject.category}, ID: ${newProject.id})`,
    });

    try {
      await prisma.project.upsert({
        where: { id },
        update: {
          number: newProject.number,
          category: newProject.category,
          categoryLabel: newProject.categoryLabel,
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          techStack: newProject.techStack,
          likeCount: newProject.likeCount,
          rating: newProject.rating,
          testimonialQuote: testimonialQuote || null,
          testimonialAuthor: testimonialAuthor || null,
          testimonialRole: testimonialRole || null,
          link: newProject.link,
        },
        create: {
          id,
          number: newProject.number,
          category: newProject.category,
          categoryLabel: newProject.categoryLabel,
          title: newProject.title,
          description: newProject.description,
          image: newProject.image,
          techStack: newProject.techStack,
          likeCount: newProject.likeCount,
          rating: newProject.rating,
          testimonialQuote: testimonialQuote || null,
          testimonialAuthor: testimonialAuthor || null,
          testimonialRole: testimonialRole || null,
          link: newProject.link,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/our-work");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
