import { notFound } from "next/navigation";
import DiseaseDetail from "./DiseaseDetail";
import { siteUrl } from "@/data/site";
import { allDiseases, findDisease } from "@/data/diseases";
import { pick } from "@/data/i18n";

export function generateStaticParams() {
  return allDiseases.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const d = findDisease(params.slug);
  if (!d) return {};
  const title = pick(d.title, "ru");
  const category = pick(d.category, "ru");
  const description = `${title}: диагностика и лечение в Израиле в клинике Ассута. Направление «${category}», современные протоколы, ведущие врачи, расчёт стоимости программы.`;
  return {
    title: `${title} — лечение в Израиле`,
    description,
    alternates: { canonical: `/diseases/${d.slug}` },
    openGraph: {
      title: `${title} — лечение в Израиле | Assuta`,
      description,
      url: `${siteUrl}/diseases/${d.slug}`,
    },
  };
}

export default function Page({ params }) {
  const d = findDisease(params.slug);
  if (!d) return notFound();
  const title = pick(d.title, "ru");
  const webpage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${title} — лечение в Израиле`,
    url: `${siteUrl}/diseases/${d.slug}`,
    about: { "@type": "MedicalCondition", name: title },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    publisher: { "@type": "MedicalOrganization", name: "Assuta", url: siteUrl },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Заболевания", item: `${siteUrl}/diseases` },
      { "@type": "ListItem", position: 3, name: title, item: `${siteUrl}/diseases/${d.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DiseaseDetail slug={d.slug} />
    </>
  );
}
