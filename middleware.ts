import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookies = request.cookies.getAll();
  console.log("🍪 All cookies: " + cookies); // debug all cookies

  const session = request.cookies.get("sessionid"); // ✅ use public cookie set by backend
  console.log("🔍 Middleware sees sessionid: " + session?.value);

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("❌ No session, redirecting to login.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
