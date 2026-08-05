import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rawTeam = await prisma.teamMember.findMany({
      orderBy: { id: "asc" },
    });

    // Normalize flat DB fields into the nested `socials` shape the UI expects
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

    return NextResponse.json(team);
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
