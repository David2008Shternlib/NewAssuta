import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.replace(/^\/en/, "") || "/";
    const url = req.nextUrl.clone();
    url.pathname = rest;

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-locale", "en");

    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });

    // Английская версия — пока перевод интерфейса при русских текстах статей.
    // Аудит прямо требует: либо полный перевод, либо закрыть от поиска.
    // Закрываем, чтобы не плодить дубли. Снять — когда статьи будут переведены.
    res.headers.set("X-Robots-Tag", "noindex, follow");

    return res;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/en", "/en/:path*"] };
