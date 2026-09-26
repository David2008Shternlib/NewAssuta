import { notFound } from "next/navigation";
import DepartmentDetail from "./DepartmentDetail";
import { departments, siteUrl } from "@/data/site";
import { getDoctorsByDepartments, getDiseasesByCategories } from "@/lib/sanity";
import { breadcrumb } from "@/lib/schema";
import { currentLocale } from "@/lib/meta";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const dept = departments.find((d) => d.slug === params.slug);
  if (!dept) return {};
  const lang = currentLocale();
  const en = lang === "en";
  const name = en ? dept.title.en : dept.title.ru;
  const desc = en ? dept.desc.en : dept.desc.ru;
  const title = en ? `${name} in Israel — Assuta Clinic` : `${name} в Израиле — клиника Ассута`;
  const description = en
    ? `${name} at the Assuta clinic (Tel Aviv): ${desc.charAt(0).toLowerCase()}${desc.slice(1)} Doctors, conditions treated and a costed treatment programme.`
    : `${name} в клинике Ассута (Тель-Авив): ${desc.toLowerCase()} Врачи направления, заболевания и расчёт стоимости программы лечения.`;
  return {
    title,
    description,
    alternates: { canonical: `/departments/${dept.slug}` },
    openGraph: {
      title: `${title} | Assuta`,
      description: desc,
      url: `${siteUrl}/departments/${dept.slug}`,
    },
  };
}

export default async function Page({ params }) {
  const dept = departments.find((d) => d.slug === params.slug);
  if (!dept) return notFound();

  const [doctors, diseases] = await Promise.all([
    getDoctorsByDepartments(dept.docDepts || []),
    getDiseasesByCategories(dept.disCats || []),
  ]);

  const crumbs = breadcrumb([
    { name: "Главная", path: "" },
    { name: "Направления лечения", path: "/departments" },
    { name: dept.title.ru, path: `/departments/${dept.slug}` },
  ]);

  const page = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${dept.title.ru} в клинике Ассута`,
    url: `${siteUrl}/departments/${dept.slug}`,
    description: dept.desc.ru,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    audience: { "@type": "MedicalAudience", audienceType: "Patient" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <DepartmentDetail dept={dept} doctors={doctors} diseases={diseases} />
    </>
  );
}
