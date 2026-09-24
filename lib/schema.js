import { siteUrl } from "@/data/site";

// Хлебные крошки. Аудит требует разметку на 100% страниц,
// поэтому собираем их одним помощником, а не копируем по файлам.
export function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.path || ""}`,
    })),
  };
}

// Раздел сайта: обычная страница со связью с организацией-издателем
export function webPage({ name, path, description }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${siteUrl}${path || ""}`,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

// Вопрос-ответ. Аудит отмечает, что ИИ-ассистенты забирают в ответ
// именно самодостаточные блоки «вопрос — короткий ответ».
export function faqPage(qa) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}

// Цены: Offer с валютой и датой актуальности
export function offerCatalog({ name, path, offers, validThrough }) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name,
    url: `${siteUrl}${path || ""}`,
    provider: { "@id": `${siteUrl}/#organization` },
    itemListElement: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: o.currency || "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: validThrough,
      url: `${siteUrl}${path || ""}`,
    })),
  };
}
