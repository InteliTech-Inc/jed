import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const publicUrl = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/waitlist",
    "/about",
    "/api/waitlist",
    "/api/request-withdrawal",
    "/api/jed-ussd",
    "/api/jed-callback",
    "/api/token",
    "/sitemap.xml",
    "/robots.txt",
  ];

  if (
    publicUrl.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname.match(/products(.*)/) ||
    req.nextUrl.pathname.match(/resources\/?(.*)/) ||
    req.nextUrl.pathname.match(/blog\/?(.*)/) ||
    req.nextUrl.pathname.match(/all-events\/?(.*)/) ||
    req.nextUrl.pathname.match(/nom\/?(.*)/)
  ) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
