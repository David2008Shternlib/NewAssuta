import ReviewsClient from "./ReviewsClient";
import { getReviews } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { siteUrl, operator } from "@/data/site";
import { pageMeta } from "@/lib/meta";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;
const ruMeta = {
  title: "Отзывы пациентов — клиника Ассута",
  description: "Истории пациентов, прошедших диагностику и лечение в клинике Ассута: онкология, ортопедия, кардиология. Как проходит организация поездки и сопровождение.",
};
const enMeta = {
  title: "Patient reviews — Assuta Clinic",
  description: "Stories from patients who had diagnosis and treatment at the Assuta clinic: oncology, orthopaedics, cardiology. How the trip and the support are arranged.",
};

export function generateMetadata() {
  return pageMeta({ path: "/reviews", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Отзывы пациентов", path: "/reviews" },
]);
const __page = webPage({ name: ruMeta.title, path: "/reviews", description: ruMeta.description });

export default async function Page() {
  const reviews = await getReviews();

  // Разметка отзывов. Отзывы относятся к услугам оператора, а не к больнице.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Отзывы пациентов",
    url: `${siteUrl}/reviews`,
    numberOfItems: reviews.length,
    itemListElement: reviews.slice(0, 50).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewBody: r.text,
        author: { "@type": "Person", name: r.author || "Пациент" },
        itemReviewed: { "@type": "Organization", name: operator.legalName, "@id": `${siteUrl}/#organization` },
        reviewRating: r.rating
          ? { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" }
          : undefined,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <ReviewsClient reviews={reviews} />
    </>
  );
}
