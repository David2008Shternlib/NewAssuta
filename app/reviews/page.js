import ReviewsClient from "./ReviewsClient";
import { getReviews } from "@/lib/sanity";

export const revalidate = 3600;
export const metadata = {
  title: "Отзывы пациентов — клиника Ассута",
  description: "Реальные истории пациентов, прошедших диагностику и лечение в клинике Ассута в Израиле.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Отзывы пациентов | Assuta", description: "Реальные истории пациентов клиники Ассута.", url: "/reviews" },
};
export default async function Page() {
  const reviews = await getReviews();
  return <ReviewsClient reviews={reviews} />;
}
