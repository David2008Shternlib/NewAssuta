import { NextResponse } from "next/server";

/**
 * Заголовки для закрытых страниц.
 *
 * Сам доступ к отчёту проверяется в самой странице по секретному хвосту
 * в адресе (app/report/access.js). Здесь остаётся то, что относится
 * ко всем адресам раздела: не пускать в поиск и не давать оседать
 * в промежуточных кэшах — внутренние цифры клиники там не нужны.
 */
const PROTECTED = ["/report"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ───────── Закрытый раздел с отчётом ─────────
  if (PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Cache-Control", "private, no-store");
    return res;
  }

  // ───────── Английская версия ─────────
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
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

export const config = { matcher: ["/en", "/en/:path*", "/report", "/report/:path*"] };
