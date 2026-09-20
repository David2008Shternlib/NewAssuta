import DiseasesClient from "./DiseasesClient";
import { getAllDiseases } from "@/lib/sanity";

export const revalidate = 3600;

export const metadata = {
  title: "Заболевания и лечение в Израиле — клиника Ассута",
  description: "Диагностика и лечение по ключевым направлениям в клинике Ассута: онкология, кардиология, ортопедия, неврология и другие.",
  alternates: { canonical: "/diseases" },
  openGraph: { title: "Заболевания и лечение в Израиле | Assuta", description: "Диагностика и лечение в клинике Ассута.", url: "/diseases" },
};

export default async function Page() {
  const diseases = await getAllDiseases();
  return <DiseasesClient diseases={diseases} />;
}
