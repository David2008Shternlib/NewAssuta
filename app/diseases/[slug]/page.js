import { notFound } from "next/navigation";
import DiseaseDetail from "./DiseaseDetail";
import { getAllDiseases, getDisease, getDoctorsByCategory } from "@/lib/sanity";
import { siteUrl } from "@/data/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const items = await getAllDiseases();
  return items.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const d = await getDisease(params.slug);
  if (!d) return {};
  const cat = d.category ? ` Направление «${d.category}».` : "";
  const description = `${d.title}: диагностика и лечение в Израиле в клинике Ассута.${cat} Современные протоколы, ведущие врачи, расчёт стоимости программы.`;
  return {
    title: `${d.title} — лечение в Израиле`,
    description,
    alternates: { canonical: `/diseases/${d.slug}` },
    openGraph: { title: `${d.title} — лечение в Израиле | Assuta`, description, url: `${siteUrl}/diseases/${d.slug}` },
  };
}

export default async function Page({ params }) {
  const d = await getDisease(params.slug);
  if (!d) return notFound();
  const doctors = (await getDoctorsByCategory(d.category)) || [];
  const webpage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${d.title} — лечение в Израиле`,
    url: `${siteUrl}/diseases/${d.slug}`,
    about: { "@type": "MedicalCondition", name: d.title },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
    publisher: { "@type": "MedicalOrganization", name: "Assuta", url: siteUrl },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Заболевания", item: `${siteUrl}/diseases` },
      { "@type": "ListItem", position: 3, name: d.title, item: `${siteUrl}/diseases/${d.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DiseaseDetail doc={d} doctors={doctors} />
    </>
  );
}
