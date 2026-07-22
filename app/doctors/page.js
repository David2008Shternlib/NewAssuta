import DoctorsClient from "./DoctorsClient";
import { getAllDoctors } from "@/lib/sanity";

export const revalidate = 3600;

export const metadata = {
  title: "Врачи клиники Ассута — ведущие специалисты Израиля",
  description: "Профильные врачи клиники Ассута в Израиле: онкологи, кардиологи, ортопеды, нейрохирурги и другие. Запись на консультацию и лечение.",
  alternates: { canonical: "/doctors" },
  openGraph: { title: "Врачи клиники Ассута | Assuta", description: "Профильные врачи клиники Ассута в Израиле.", url: "/doctors" },
};

export default async function Page() {
  const doctors = await getAllDoctors();
  return <DoctorsClient doctors={doctors} />;
}
