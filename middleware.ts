import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Extract clean host without port
  const currentHost = hostname.split(":")[0].toLowerCase();
  
  // Support both cms.cortexcoregroup.com and admin.cortexcoregroup.com
  const isAdminSubdomain =
    currentHost.startsWith("cms.") ||
    currentHost.startsWith("admin.");

  const isLocalhost = currentHost === "localhost" || currentHost === "127.0.0.1";

  // Prevent rewriting for static assets and Next internal files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/images") ||
    url.pathname.startsWith("/uploads") ||
    url.pathname.startsWith("/favicon") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 1. If accessed via cms.cortexcoregroup.com (or admin.cortexcoregroup.com)
  if (isAdminSubdomain) {
    // If requesting API routes, pass through directly
    if (url.pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    // If pathname is already /admin or /admin/*, pass through
    if (url.pathname.startsWith("/admin")) {
      return NextResponse.next();
    }

    // Otherwise, rewrite root or subpaths cleanly to /admin/*
    // e.g. cms.cortexcoregroup.com/ -> /admin
    // cms.cortexcoregroup.com/services -> /admin/services
    // cms.cortexcoregroup.com/login -> /admin/login
    // cms.cortexcoregroup.com/messages -> /admin/messages
    const rewrittenPath = url.pathname === "/" ? "/admin" : `/admin${url.pathname}`;
    return NextResponse.rewrite(new URL(rewrittenPath, request.url));
  }

  // 2. If accessed via main domain in production (e.g. cortexcoregroup.com)
  // Hide /admin routes from the main public domain for stealth security
  if (!isLocalhost && !isAdminSubdomain && url.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
