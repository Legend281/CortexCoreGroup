import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-auth";

export async function GET() {
  const isAuthenticated = verifyAdminSession();
  if (!isAuthenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      name: "Cortex Master Administrator",
      role: "SUPER_ADMIN",
      email: "admin@cortexcoregroup.com",
    },
  });
}
