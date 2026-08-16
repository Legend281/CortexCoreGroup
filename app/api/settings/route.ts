import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/admin-auth";

const DEFAULT_SETTINGS: Record<string, string> = {
  companyName: "Cortex Core Group",
  tagline: "Smart Solutions. Real Impact.",
  primaryEmail: "info@cortexcoregroup.com",
  primaryPhone: "+237 6 12 34 56 76",
  address: "Buea, South West Region, Cameroon",
  operationalStatus: "Accepting Global Client Engagements & Engineering Sprints",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  github: "https://github.com",
  metaTitle: "Cortex Core Group — Smart Solutions. Real Impact.",
  metaDescription:
    "Transforming business ideas into intelligent digital experiences through innovation, creativity, and the power of AI.",
};

let memorySettings: Record<string, string> = { ...DEFAULT_SETTINGS };

export async function GET() {
  try {
    const settings = await prisma.setting.findMany();
    if (settings && settings.length > 0) {
      const settingsMap: Record<string, string> = { ...DEFAULT_SETTINGS };
      settings.forEach((s: any) => {
        settingsMap[s.key] = s.value;
      });
      return NextResponse.json(settingsMap);
    }
    return NextResponse.json(memorySettings);
  } catch (error) {
    return NextResponse.json(memorySettings);
  }
}

export async function POST(request: Request) {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Update settings in parallel
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        memorySettings[key] = value;
        try {
          await prisma.setting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
          });
        } catch (_) {}
      }
    }

    try {
      await prisma.auditLog.create({
        data: {
          action: "UPDATE_SETTINGS",
          details: "Updated global platform settings & metadata",
        },
      });
    } catch (_) {}

    try {
      revalidatePath("/");
      revalidatePath("/contact");
      revalidatePath("/about");
    } catch (_) {}

    return NextResponse.json({ success: true, settings: memorySettings });
  } catch (error: any) {
    console.error("Settings error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save settings" },
      { status: 500 }
    );
  }
}
