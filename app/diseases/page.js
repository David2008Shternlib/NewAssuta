import Client from "./DiseasesClient";

export const metadata = {
  title: "Заболевания и лечение в Израиле — клиника Ассута",
  description: "Диагностика и лечение по ключевым направлениям в клинике Ассута: онкология, кардиология, ортопедия, неврология и другие.",
  alternates: { canonical: "/diseases" },
  openGraph: { title: "Заболевания и лечение в Израиле — клиника Ассута | Assuta", description: "Диагностика и лечение по ключевым направлениям в клинике Ассута: онкология, кардиология, ортопедия, неврология и другие.", url: "/diseases" },
};

export default function Page() {
  return <Client />;
}
