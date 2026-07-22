import { notFound } from "next/navigation";
import DoctorDetail from "./DoctorDetail";
import { doctors, deptNames, siteUrl } from "@/data/site";
import { pick } from "@/data/i18n";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const doc = doctors.find((d) => d.slug === params.slug);
  if (!doc) return {};
  const name = pick(doc.name, "ru");
  const spec = pick(doc.spec, "ru");
  const dept = pick(deptNames[doc.dept], "ru");
  const description = `${name} — ${spec}, ${dept} в клинике Ассута (Израиль, Тель-Авив). Запись на консультацию и лечение, второе мнение.`;
  return {
    title: `${name} — ${spec}`,
    description,
    alternates: { canonical: `/doctors/${doc.slug}` },
    openGraph: {
      title: `${name} — ${spec} | Assuta`,
      description,
      url: `${siteUrl}/doctors/${doc.slug}`,
      images: doc.photo ? [{ url: doc.photo }] : undefined,
    },
  };
}

export default function Page({ params }) {
  const doc = doctors.find((d) => d.slug === params.slug);
  if (!doc) return notFound();
  const name = pick(doc.name, "ru");
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name,
    medicalSpecialty: pick(doc.spec, "ru"),
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
      { "@type": "ListItem", position: 3, name, item: `${siteUrl}/doctors/${doc.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physician) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DoctorDetail slug={doc.slug} />
    </>
  );
}
