import Client from "./DiagnosticsClient";
import { breadcrumb, webPage } from "@/lib/schema";

export const metadata = {
  title: "Диагностические программы (check-up) — клиника Ассута",
  description: "Комплексное обследование организма за 1–3 дня в клинике Ассута: check-up для мужчин и женщин, онкоскрининг, кардиодиагностика.",
  alternates: { canonical: "/diagnostics" },
  openGraph: { title: "Диагностические программы (check-up) — клиника Ассута | Assuta", description: "Комплексное обследование организма за 1–3 дня в клинике Ассута: check-up для мужчин и женщин, онкоскрининг, кардиодиагностика.", url: "/diagnostics" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Диагностические программы", path: "/diagnostics" },
]);
const __page = webPage({ name: metadata.title, path: "/diagnostics", description: metadata.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
