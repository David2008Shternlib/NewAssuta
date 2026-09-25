import DiseasesClient from "./DiseasesClient";
import { getAllDiseases } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export const metadata = {
  title: "Заболевания и лечение в Израиле — клиника Ассута",
  description: "Диагностика и лечение по ключевым направлениям в клинике Ассута: онкология, кардиология, ортопедия, неврология и другие.",
  alternates: { canonical: "/diseases" },
  openGraph: { title: "Заболевания и лечение в Израиле | Assuta", description: "Диагностика и лечение в клинике Ассута.", url: "/diseases" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Заболевания", path: "/diseases" },
]);
const __page = webPage({ name: metadata.title, path: "/diseases", description: metadata.description });

export default async function Page() {
  const diseases = await getAllDiseases();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <DiseasesClient diseases={diseases} />
    </>
  );
}
