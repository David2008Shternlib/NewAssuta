import PrivacyClient from "./PrivacyClient";
import { siteUrl, operator } from "@/data/site";
import { breadcrumb } from "@/lib/schema";

export const metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как мы обрабатываем персональные данные, отправленные через формы сайта: какие данные собираем, зачем, кому передаём, сколько храним и как их удалить.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Политика конфиденциальности | Assuta",
    description: "Какие данные собираем через формы сайта, зачем, кому передаём, сколько храним и как их удалить.",
    url: `${siteUrl}/privacy`,
  },
};

export default function Page() {
  const crumbs = breadcrumb([
    { name: "Главная", path: "" },
    { name: "Политика конфиденциальности", path: "/privacy" },
  ]);

  const doc = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Политика конфиденциальности",
    url: `${siteUrl}/privacy`,
    publisher: { "@id": `${siteUrl}/#organization` },
    about: { "@type": "Organization", name: operator.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(doc) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <PrivacyClient />
    </>
  );
}
