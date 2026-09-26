import Client from "./DiagnosticsClient";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

const ruMeta = {
  title: "Диагностические программы (check-up) — клиника Ассута",
  description: "Комплексное обследование организма за 1–3 дня в клинике Ассута: check-up для мужчин и женщин, онкоскрининг, кардиодиагностика.",
};
const enMeta = {
  title: "Diagnostic programmes (check-up) — Assuta Clinic",
  description: "A full check-up in 1-3 days at the Assuta clinic: programmes for men and women, cancer screening and cardiac diagnostics.",
};

export function generateMetadata() {
  return pageMeta({ path: "/diagnostics", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Диагностические программы", path: "/diagnostics" },
]);
const __page = webPage({ name: ruMeta.title, path: "/diagnostics", description: ruMeta.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
