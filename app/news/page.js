import NewsClient from "./NewsClient";
import { getAllNews } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;
const ruMeta = {
  title: "Медицинские новости — клиника Ассута",
  description: "Новости медицины Израиля: новые технологии диагностики и лечения, методы онкологической помощи, полезные материалы для пациентов клиники Ассута.",
};
const enMeta = {
  title: "Medical news — Assuta Clinic",
  description: "Medical news from Israel: new diagnostic and treatment technologies, cancer care and useful material for patients of the Assuta clinic.",
};

export function generateMetadata() {
  return pageMeta({ path: "/news", ru: ruMeta, en: enMeta });
}
const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Новости", path: "/news" },
]);
const __page = webPage({ name: ruMeta.title, path: "/news", description: ruMeta.description });

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
