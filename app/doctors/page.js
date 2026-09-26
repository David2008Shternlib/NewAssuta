import DoctorsClient from "./DoctorsClient";
import { getAllDoctors } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

const ruMeta = {
  title: "Врачи клиники Ассута — ведущие специалисты Израиля",
  description: "Профильные врачи клиники Ассута в Израиле: онкологи, кардиологи, ортопеды, нейрохирурги и другие. Запись на консультацию и лечение.",
};
const enMeta = {
  title: "Doctors of the Assuta Clinic — leading specialists in Israel",
  description: "Specialist doctors at the Assuta clinic in Israel: oncologists, cardiologists, orthopaedic surgeons, neurosurgeons and others. Book a consultation or treatment.",
};

export function generateMetadata() {
  return pageMeta({ path: "/doctors", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Врачи", path: "/doctors" },
]);
const __page = webPage({ name: ruMeta.title, path: "/doctors", description: ruMeta.description });

export default async function Page() {
  const doctors = await getAllDoctors();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <DoctorsClient doctors={doctors} />
    </>
  );
}
