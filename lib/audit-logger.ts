import { prisma } from "@/lib/prisma";
import { dataStore } from "@/lib/data-store";

export interface LogAuditParams {
  action:
    | "AUTH_LOGIN"
    | "AUTH_LOGOUT"
    | "SERVICE_CREATE"
    | "SERVICE_UPDATE"
    | "SERVICE_DELETE"
    | "PROJECT_CREATE"
    | "PROJECT_UPDATE"
    | "PROJECT_DELETE"
    | "TEAM_CREATE"
    | "TEAM_UPDATE"
    | "TEAM_DELETE"
    | "BLOG_CREATE"
    | "BLOG_UPDATE"
    | "BLOG_DELETE"
    | "MESSAGE_READ"
    | "MESSAGE_DELETE"
    | "LEAD_SUBMITTED"
    | "TESTIMONIAL_CREATE"
    | "TESTIMONIAL_UPDATE"
    | "TESTIMONIAL_DELETE"
    | "SETTINGS_UPDATE"
    | "IMAGE_UPLOAD"
    | string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  profileId?: string;
}

export async function logAudit(params: LogAuditParams) {
  const { action, details, ipAddress = "127.0.0.1", userAgent = "Admin Dashboard", profileId } = params;

  // 1. Immediately record in-memory so UI displays it instantly with zero lag
  const localEntry = dataStore.addAuditLog({
    action,
    details,
    ipAddress,
    userAgent,
    createdAt: new Date().toISOString(),
  });

  // 2. Asynchronously persist to database
  try {
    await prisma.auditLog.create({
      data: {
        action,
        details,
        ipAddress,
        userAgent,
        profileId: profileId || null,
      },
    });
  } catch (_) {
    // Graceful fallback to memory store if DB is offline
  }

  return localEntry;
}
