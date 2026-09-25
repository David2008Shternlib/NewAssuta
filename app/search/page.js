import SearchClient from "./SearchClient";
import { search } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { siteUrl } from "@/data/site";

// Результаты зависят от запроса — кэшировать нечего
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Поиск по сайту",
  description:
    "Поиск врачей, заболеваний и статей на сайте клиники Ассута: введите название болезни, фамилию врача или направление лечения.",
  alternates: { canonical: "/search" },
  // страницы результатов поиска не должны попадать в индекс
  robots: { index: false, follow: true },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Поиск", path: "/search" },
]);
const __page = webPage({ name: metadata.title, path: "/search", description: metadata.description });

export default async function Page({ searchParams }) {
  const q = (searchParams?.q || "").toString().slice(0, 100);
  const results = await search(q);

  const searchAction = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchAction) }} />
      <SearchClient q={q} results={results} />
    </>
  );
}
