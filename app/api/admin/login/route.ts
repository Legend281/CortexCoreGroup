import { NextResponse } from "next/server";
import { getAdminPassword, setAdminSessionCookie } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = getAdminPassword();

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid administrative credentials" },
        { status: 401 }
      );
    }

    setAdminSessionCookie();

    // Log login action to AuditLog
    try {
      await prisma.auditLog.create({
        data: {
          action: "ADMIN_LOGIN",
          details: "Administrator authenticated successfully.",
        },
      });
    } catch (logErr) {
      console.warn("Could not log admin login:", logErr);
    }

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
