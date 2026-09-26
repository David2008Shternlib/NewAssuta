import PrivacyClient from "./PrivacyClient";
import { siteUrl, operator } from "@/data/site";
import { breadcrumb } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

const ruMeta = {
  title: "Политика конфиденциальности",
  description: "Как мы обрабатываем персональные данные, отправленные через формы сайта: какие данные собираем, зачем, кому передаём, сколько храним и как их удалить.",
};
const enMeta = {
  title: "Privacy policy",
  description: "How we process the personal data submitted through the forms on this site: what we collect, why, who we share it with, how long we keep it and how to have it deleted.",
};

export function generateMetadata() {
  return pageMeta({ path: "/privacy", ru: ruMeta, en: enMeta, extra: { robots: { index: true, follow: true } } });
}

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
