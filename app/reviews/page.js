import ReviewsClient from "./ReviewsClient";
import { getReviews } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { siteUrl, operator } from "@/data/site";

export const revalidate = 3600;
export const metadata = {
  title: "Отзывы пациентов — клиника Ассута",
  description: "Истории пациентов, прошедших диагностику и лечение в клинике Ассута: онкология, ортопедия, кардиология. Как проходит организация поездки и сопровождение.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Отзывы пациентов | Assuta", description: "Реальные истории пациентов клиники Ассута.", url: "/reviews" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Отзывы пациентов", path: "/reviews" },
]);
const __page = webPage({ name: metadata.title, path: "/reviews", description: metadata.description });

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
