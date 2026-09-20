import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.replace(/^\/en/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = rest;
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", "en");
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/en", "/en/:path*"] };
