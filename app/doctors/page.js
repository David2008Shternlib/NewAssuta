import DoctorsClient from "./DoctorsClient";
import { getAllDoctors } from "@/lib/sanity";
import { breadcrumb, webPage } from "@/lib/schema";

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export const metadata = {
  title: "Врачи клиники Ассута — ведущие специалисты Израиля",
  description: "Профильные врачи клиники Ассута в Израиле: онкологи, кардиологи, ортопеды, нейрохирурги и другие. Запись на консультацию и лечение.",
  alternates: { canonical: "/doctors" },
  openGraph: { title: "Врачи клиники Ассута | Assuta", description: "Профильные врачи клиники Ассута в Израиле.", url: "/doctors" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Врачи", path: "/doctors" },
]);
const __page = webPage({ name: metadata.title, path: "/doctors", description: metadata.description });

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
