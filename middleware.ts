import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  alert("🍪 All cookies: " + cookies); // debug all cookies

  const session = request.cookies.get("sessionid"); // ✅ use public cookie set by backend
  alert("🔍 Middleware sees sessionid: " + session?.value);

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    alert("❌ No session, redirecting to login.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
