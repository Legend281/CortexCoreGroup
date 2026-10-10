import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { logAudit } from "@/lib/audit-logger";
import { TeamMember } from "@/data/team";

export async function GET() {
  try {
    const rawTeam = await Promise.race([
      prisma.teamMember.findMany({ orderBy: { id: "asc" } }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DB timeout")), 1500)
      ),
    ]);

    if (rawTeam && rawTeam.length > 0) {
      const team = rawTeam.map((member: any) => ({
        id: member.id,
        name: member.name,
        role: member.role,
        category: member.category,
        bio: member.bio,
        image: member.image,
        techStack: member.techStack,
        socials: {
          linkedin: member.linkedin || undefined,
          github: member.github || undefined,
          email: member.email || undefined,
          whatsapp: member.whatsapp || undefined,
          portfolio: member.portfolio || undefined,
        },
      }));
      dataStore.setTeam(team);
      return NextResponse.json(team);
    }
  } catch (error) {}

  return NextResponse.json(dataStore.getTeam());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
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

    if (!name || !role || !bio) {
      return NextResponse.json(
        { error: "Missing required fields (name, role, bio)" },
        { status: 400 }
      );
    }

    const memberId = id || String(Date.now());
    const newMember: TeamMember = {
      id: memberId,
      name,
      role,
      category: category || "Engineering",
      bio,
      image: image || "",
      techStack: Array.isArray(techStack) ? techStack : [],
      socials: {
        linkedin: linkedin || undefined,
        github: github || undefined,
        email: email || undefined,
        whatsapp: whatsapp || undefined,
        portfolio: portfolio || undefined,
      },
    };

    dataStore.upsertTeamMember(newMember);

    await logAudit({
      action: "TEAM_CREATE",
      details: `Added new team member: "${newMember.name}" (${newMember.role}, ID: ${memberId})`,
    });

    try {
      await prisma.teamMember.upsert({
        where: { id: memberId },
        update: {
          name,
          role,
          category: newMember.category,
          bio,
          image: newMember.image,
          techStack: newMember.techStack,
          linkedin: linkedin || null,
          github: github || null,
          email: email || null,
          whatsapp: whatsapp || null,
          portfolio: portfolio || null,
        },
        create: {
          id: memberId,
          name,
          role,
          category: newMember.category,
          bio,
          image: newMember.image,
          techStack: newMember.techStack,
          linkedin: linkedin || null,
          github: github || null,
          email: email || null,
          whatsapp: whatsapp || null,
          portfolio: portfolio || null,
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/about");
      revalidatePath("/team");
      revalidatePath("/");
    } catch (_) {}

    return NextResponse.json(newMember, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create team member" },
      { status: 500 }
    );
  }
}
