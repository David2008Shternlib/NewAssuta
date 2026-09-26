import { notFound } from "next/navigation";
import DiseaseDetail from "./DiseaseDetail";
import { getAllDiseases, getDisease, getDoctorsByCategory } from "@/lib/sanity";
import { siteUrl, cmsLabel } from "@/data/site";
import { currentLocale } from "@/lib/meta";
import { cms } from "@/data/i18n";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export async function generateStaticParams() {
  const items = await getAllDiseases();
  return items.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const d = await getDisease(params.slug);
  if (!d) return {};
  const lang = currentLocale();
  const name = cms(d, "title", lang);
  const cat = d.category ? cmsLabel(d.category, lang) : "";
  const title = lang === "en" ? `${name} — treatment in Israel` : `${name} — лечение в Израиле`;
  const description =
    lang === "en"
      ? `${name}: diagnosis and treatment in Israel at the Assuta clinic.${cat ? ` Speciality: ${cat}.` : ""} Modern protocols, leading doctors, a costed treatment programme.`
      : `${name}: диагностика и лечение в Израиле в клинике Ассута.${cat ? ` Направление «${cat}».` : ""} Современные протоколы, ведущие врачи, расчёт стоимости программы.`;
  return {
    title,
    description,
    alternates: { canonical: `/diseases/${d.slug}` },
    openGraph: { title: `${title} | Assuta`, description, url: `${siteUrl}/diseases/${d.slug}` },
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
