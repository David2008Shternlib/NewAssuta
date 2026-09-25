import NewsClient from "./NewsClient";
import { getAllNews } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;
export const metadata = {
  title: "Медицинские новости — клиника Ассута",
  description: "Новости медицины Израиля: новые технологии диагностики и лечения, методы онкологической помощи, полезные материалы для пациентов клиники Ассута.",
  alternates: { canonical: "/news" },
  openGraph: { title: "Медицинские новости | Assuta", description: "Новости клиники Ассута.", url: "/news" },
};
const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Новости", path: "/news" },
]);
const __page = webPage({ name: metadata.title, path: "/news", description: metadata.description });

export default async function Page() {
  const news = await getAllNews();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <NewsClient news={news} />
    </>
  );
}
