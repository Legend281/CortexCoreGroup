import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";
import { verifyAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!verifyAdminSession()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const dbLogs = await Promise.race([
        prisma.auditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 200,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("DB timeout")), 1500)
        ),
      ]);

      if (dbLogs && dbLogs.length > 0) {
        // Sync to memory store
        dataStore.setAuditLogs(dbLogs);
        return NextResponse.json(dbLogs);
      }
    } catch (_) {}

    // In-memory instant fallback
    return NextResponse.json(dataStore.getAuditLogs());
  } catch (error) {
    return NextResponse.json(dataStore.getAuditLogs());
  }
}
