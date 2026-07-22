import Client from "./ReviewsClient";

export const metadata = {
  title: "Отзывы пациентов — клиника Ассута",
  description: "Реальные истории пациентов, прошедших диагностику и лечение в клинике Ассута в Израиле.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Отзывы пациентов — клиника Ассута | Assuta", description: "Реальные истории пациентов, прошедших диагностику и лечение в клинике Ассута в Израиле.", url: "/reviews" },
};

export default function Page() {
  return <Client />;
}
