import DiseasesClient from "./DiseasesClient";
import { getAllDiseases } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

const ruMeta = {
  title: "Заболевания и лечение в Израиле — клиника Ассута",
  description: "Диагностика и лечение по ключевым направлениям в клинике Ассута: онкология, кардиология, ортопедия, неврология и другие.",
};
const enMeta = {
  title: "Conditions and treatment in Israel — Assuta Clinic",
  description: "Diagnosis and treatment in the main specialities at the Assuta clinic: oncology, cardiology, orthopaedics, neurology and others.",
};

export function generateMetadata() {
  return pageMeta({ path: "/diseases", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Заболевания", path: "/diseases" },
]);
const __page = webPage({ name: ruMeta.title, path: "/diseases", description: ruMeta.description });

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
