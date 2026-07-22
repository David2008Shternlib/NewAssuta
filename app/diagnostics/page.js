import Client from "./DiagnosticsClient";

export const metadata = {
  title: "Диагностические программы (check-up) — клиника Ассута",
  description: "Комплексное обследование организма за 1–3 дня в клинике Ассута: check-up для мужчин и женщин, онкоскрининг, кардиодиагностика.",
  alternates: { canonical: "/diagnostics" },
  openGraph: { title: "Диагностические программы (check-up) — клиника Ассута | Assuta", description: "Комплексное обследование организма за 1–3 дня в клинике Ассута: check-up для мужчин и женщин, онкоскрининг, кардиодиагностика.", url: "/diagnostics" },
};

export default function Page() {
  return <Client />;
}
