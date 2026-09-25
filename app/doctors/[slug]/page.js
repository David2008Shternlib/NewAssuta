import { notFound } from "next/navigation";
import DoctorDetail from "./DoctorDetail";
import { getAllDoctors, getDoctor } from "@/lib/sanity";
import { siteUrl } from "@/data/site";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export async function generateStaticParams() {
  const docs = await getAllDoctors();
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const doc = await getDoctor(params.slug);
  if (!doc) return {};
  const spec = doc.spec ? ` — ${doc.spec}` : "";
  const description = `${doc.name}${spec}, клиника Ассута (Израиль, Тель-Авив). Запись на консультацию и лечение, второе врачебное мнение.`;
  return {
    title: `${doc.name}${spec}`,
    description,
    alternates: { canonical: `/doctors/${doc.slug}` },
    openGraph: {
      title: `${doc.name}${spec} | Assuta`,
      description,
      url: `${siteUrl}/doctors/${doc.slug}`,
      images: doc.photo ? [{ url: doc.photo }] : undefined,
    },
  };
}

export default async function Page({ params }) {
  const doc = await getDoctor(params.slug);
  if (!doc) return notFound();
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doc.name,
    medicalSpecialty: doc.spec || doc.dept || undefined,
    image: doc.photo || undefined,
    url: `${siteUrl}/doctors/${doc.slug}`,
    worksFor: { "@type": "MedicalOrganization", name: "Assuta", url: siteUrl },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Врачи", item: `${siteUrl}/doctors` },
      { "@type": "ListItem", position: 3, name: doc.name, item: `${siteUrl}/doctors/${doc.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physician) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DoctorDetail doc={doc} />
    </>
  );
}
