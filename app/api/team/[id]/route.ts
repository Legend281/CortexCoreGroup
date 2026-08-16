import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { TeamMember } from "@/data/team";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const member = await Promise.race([
      prisma.teamMember.findUnique({ where: { id: params.id } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);
    if (member) return NextResponse.json(member);
  } catch (error) {}

  const local = dataStore.getTeam().find((m) => m.id === params.id);
  if (local) return NextResponse.json(local);

  return NextResponse.json({ error: "Team member not found" }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      role,
      category,
      bio,
      image,
      techStack,
      linkedin,
      github,
      email,
      whatsapp,
      portfolio,
    } = body;

    const currentTeam = dataStore.getTeam();
    const existing = currentTeam.find((m) => m.id === params.id);

    const updated: TeamMember = {
      id: params.id,
      name: name || existing?.name || "",
      role: role || existing?.role || "",
      category: category || existing?.category || "Engineering",
      bio: bio || existing?.bio || "",
      image: image !== undefined ? image : existing?.image || "",
      techStack: Array.isArray(techStack) ? techStack : existing?.techStack || [],
      socials: {
        linkedin: linkedin !== undefined ? linkedin : existing?.socials.linkedin,
        github: github !== undefined ? github : existing?.socials.github,
        email: email !== undefined ? email : existing?.socials.email,
        whatsapp: whatsapp !== undefined ? whatsapp : existing?.socials.whatsapp,
        portfolio: portfolio !== undefined ? portfolio : existing?.socials.portfolio,
      },
    };

    dataStore.upsertTeamMember(updated);

    await logAudit({
      action: "TEAM_UPDATE",
      details: `Updated team member: "${updated.name}" (${updated.role}, ID: ${params.id})`,
    });

    try {
      await prisma.teamMember.update({
        where: { id: params.id },
        data: {
          name: updated.name,
          role: updated.role,
          category: updated.category,
          bio: updated.bio,
          image: updated.image,
          techStack: updated.techStack,
          linkedin: updated.socials.linkedin || null,
          github: updated.socials.github || null,
          email: updated.socials.email || null,
          whatsapp: updated.socials.whatsapp || null,
          portfolio: updated.socials.portfolio || null,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/about");
      revalidatePath("/team");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentTeam = dataStore.getTeam();
    const existing = currentTeam.find((m) => m.id === params.id);

    dataStore.deleteTeamMember(params.id);

    await logAudit({
      action: "TEAM_DELETE",
      details: `Deleted team member: "${existing?.name || params.id}" (ID: ${params.id})`,
    });

    try {
      await prisma.teamMember.delete({
        where: { id: params.id },
      });
    } catch (_) {}

    try {
      revalidatePath("/about");
      revalidatePath("/team");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json({ success: true, message: "Team member deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete team member" },
      { status: 500 }
    );
  }
}
