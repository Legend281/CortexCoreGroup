import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "cortex_admin_session";
const DEFAULT_SECRET = "cortex-super-secret-session-token-2026";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || DEFAULT_SECRET;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "cortex-admin-2026";
}

export function verifyAdminSession(): boolean {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return false;
    }
    return sessionCookie.value === getAdminSecret();
  } catch (err) {
    return false;
  }
}

export function setAdminSessionCookie(): void {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, getAdminSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearAdminSessionCookie(): void {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
