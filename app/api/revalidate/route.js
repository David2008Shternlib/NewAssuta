import { revalidatePath } from "next/cache";
import { departments } from "@/data/site";

/**
 * Обновление сайта по сигналу из CMS.
 *
 * Без этого страницы живут из кэша до получаса: сотрудник клиники удаляет
 * врача в Studio, а на сайте он ещё висит. Sanity умеет дёргать этот адрес
 * при каждой публикации — тогда изменения появляются за секунды.
 *
 * Настройка на стороне Sanity описана в cms/README.md.
 * Секрет берётся из переменной окружения REVALIDATE_SECRET.
 */

export const dynamic = "force-dynamic";

function isAuthorized(req, body) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false; // не настроено — никого не пускаем
  const header = req.headers.get("x-revalidate-secret");
  const url = new URL(req.url);
  const query = url.searchParams.get("secret");
  return header === expected || query === expected || body?.secret === expected;
}

export async function POST(req) {
  let body = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }

  if (!isAuthorized(req, body)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const type = body?._type || body?.type || "";
  const slug = body?.slug?.current || body?.slug || "";

  // Списки и карта сайта меняются при любой правке контента
  const paths = new Set(["/", "/sitemap.xml"]);

  if (type === "doctor" || !type) {
    paths.add("/doctors");
    if (slug) paths.add(`/doctors/${slug}`);
    departments.forEach((d) => paths.add(`/departments/${d.slug}`));
  }
  if (type === "disease" || !type) {
    paths.add("/diseases");
    if (slug) paths.add(`/diseases/${slug}`);
    departments.forEach((d) => paths.add(`/departments/${d.slug}`));
  }
  if (type === "news" || !type) {
    paths.add("/news");
    if (slug) paths.add(`/news/${slug}`);
  }
  if (type === "review" || !type) paths.add("/reviews");

  const done = [];
  for (const p of paths) {
    try {
      revalidatePath(p);
      done.push(p);
    } catch (e) {
      console.error("[revalidate] не удалось обновить", p, e.message);
    }
  }

  console.log(`[revalidate] тип=${type || "любой"} слаг=${slug || "-"} обновлено=${done.length}`);
  return Response.json({ ok: true, type: type || null, slug: slug || null, revalidated: done.length });
}

// Удобно для проверки: открыть в браузере с ?secret=... и увидеть, что маршрут жив
export async function GET(req) {
  if (!isAuthorized(req, null)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true, note: "весь сайт помечен для обновления" });
}
