import { notFound } from "next/navigation";
import NewsDetail from "./NewsDetail";
import { getAllNews, getNews } from "@/lib/sanity";
import { siteUrl } from "@/data/site";
import { breadcrumb } from "@/lib/schema";
import { currentLocale } from "@/lib/meta";
import { cms } from "@/data/i18n";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}
export async function generateMetadata({ params }) {
  const n = await getNews(params.slug);
  if (!n) return {};
  const lang = currentLocale();
  const title = cms(n, "title", lang);
  const description = (cms(n, "excerpt", lang) || title || "").slice(0, 180);
  return {
    title,
    description,
    alternates: { canonical: `/news/${n.slug}` },
    openGraph: { title: `${title} | Assuta`, description, url: `${siteUrl}/news/${n.slug}`, images: n.image ? [{ url: n.image }] : undefined },
  };
}
export default async function Page({ params }) {
  const n = await getNews(params.slug);
  if (!n) return notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: n.title,
    description: n.excerpt || undefined,
    image: n.image || undefined,
    datePublished: n.date || undefined,
    dateModified: n.date || undefined,
    url: `${siteUrl}/news/${n.slug}`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    author: { "@id": `${siteUrl}/#organization` },
  };

  const crumbs = breadcrumb([
    { name: "Главная", path: "" },
    { name: "Новости", path: "/news" },
    { name: n.title, path: `/news/${n.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <NewsDetail item={n} />
    </>
  );
}
