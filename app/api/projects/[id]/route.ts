import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { ProjectItem } from "@/data/projects";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await Promise.race([
      prisma.project.findUnique({ where: { id: params.id } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (project) return NextResponse.json(project);
  } catch (error) {}

  const local = dataStore.getProjects().find((p) => p.id === params.id);
  if (local) return NextResponse.json(local);

  return NextResponse.json({ error: "Project not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
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

    const currentProjects = dataStore.getProjects();
    const existing = currentProjects.find((p) => p.id === params.id);

    const updated: ProjectItem = {
      id: params.id,
      number: number || existing?.number || "01",
      category: category || existing?.category || "Web Applications",
      categoryLabel: categoryLabel || existing?.categoryLabel || "WEB APPLICATION",
      title: title || existing?.title || "",
      description: description || existing?.description || "",
      image: image !== undefined ? image : existing?.image || "/images/projects/default.png",
      techStack: Array.isArray(techStack) ? techStack : existing?.techStack || [],
      likeCount: typeof likeCount === "number" ? likeCount : existing?.likeCount || 0,
      rating: typeof rating === "number" ? rating : existing?.rating || 5,
      testimonial: testimonialQuote
        ? {
            quote: testimonialQuote,
            author: testimonialAuthor || "",
            role: testimonialRole || "",
          }
        : existing?.testimonial,
      link: link || existing?.link || `/our-work/${params.id}`,
    };

    dataStore.upsertProject(updated);

    await logAudit({
      action: "PROJECT_UPDATE",
      details: `Updated project: "${updated.title}" (${updated.category}, ID: ${params.id})`,
    });

    try {
      await prisma.project.update({
        where: { id: params.id },
        data: {
          number: updated.number,
          category: updated.category,
          categoryLabel: updated.categoryLabel,
          title: updated.title,
          description: updated.description,
          image: updated.image,
          techStack: updated.techStack,
          likeCount: updated.likeCount,
          rating: updated.rating,
          testimonialQuote: testimonialQuote || null,
          testimonialAuthor: testimonialAuthor || null,
          testimonialRole: testimonialRole || null,
          link: updated.link,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/our-work");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentProjects = dataStore.getProjects();
    const existing = currentProjects.find((p) => p.id === params.id);

    dataStore.deleteProject(params.id);

    await logAudit({
      action: "PROJECT_DELETE",
      details: `Deleted project: "${existing?.title || params.id}" (ID: ${params.id})`,
    });

    try {
      await prisma.project.delete({
        where: { id: params.id },
      });
    } catch (_) {}

    try {
      revalidatePath("/our-work");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
