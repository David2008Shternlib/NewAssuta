import { siteUrl, departments } from "@/data/site";
import { getAllDoctors, getAllDiseases, getAllNews } from "@/lib/sanity";

// Карта сайта строится из CMS, а не из статических списков,
// иначе в неё попадала бы лишь горстка старых страниц.
export default async function sitemap() {
  const now = new Date();

  const staticPaths = ["", "/doctors", "/diseases", "/departments", "/diagnostics", "/prices", "/reviews", "/news", "/contacts", "/about"];
  const staticRoutes = staticPaths.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));

  // страницы направлений — их не было в карте сайта, хотя это 12 живых разделов
  const departmentRoutes = departments.map((d) => ({
    url: `${siteUrl}/departments/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let doctors = [];
  let diseases = [];
  let news = [];
  try {
    [doctors, diseases, news] = await Promise.all([getAllDoctors(), getAllDiseases(), getAllNews()]);
  } catch (e) {
    // если CMS недоступна — отдаём хотя бы основные разделы, а не пустую карту
    return [...staticRoutes, ...departmentRoutes];
  }

  const entry = (path, priority, lastModified) => ({
    url: `${siteUrl}${path}`,
    lastModified: lastModified ? new Date(lastModified) : now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    ...staticRoutes,
    ...departmentRoutes,
    ...(doctors || []).filter((d) => d.slug).map((d) => entry(`/doctors/${d.slug}`, 0.6)),
    ...(diseases || []).filter((d) => d.slug).map((d) => entry(`/diseases/${d.slug}`, 0.6)),
    ...(news || []).filter((n) => n.slug).map((n) => entry(`/news/${n.slug}`, 0.5, n.date)),
  ];
}
