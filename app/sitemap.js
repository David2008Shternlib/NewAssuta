import { siteUrl, doctors } from "@/data/site";
import { allDiseases } from "@/data/diseases";

export default function sitemap() {
  const now = new Date();
  const staticPaths = ["", "/doctors", "/diseases", "/departments", "/diagnostics", "/prices", "/reviews", "/news", "/contacts", "/about"];
  const staticRoutes = staticPaths.map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
  const doctorRoutes = doctors.map((d) => ({
    url: `${siteUrl}/doctors/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  const diseaseRoutes = allDiseases.map((d) => ({
    url: `${siteUrl}/diseases/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticRoutes, ...doctorRoutes, ...diseaseRoutes];
}
