import Client from "./PricesClient";

export const metadata = {
  title: "Цены на лечение и диагностику — клиника Ассута",
  description: "Ориентировочные цены на консультации, диагностику, онкологию и хирургию в клинике Ассута (Израиль). Точную стоимость рассчитает координатор.",
  alternates: { canonical: "/prices" },
  openGraph: { title: "Цены на лечение и диагностику — клиника Ассута | Assuta", description: "Ориентировочные цены на консультации, диагностику, онкологию и хирургию в клинике Ассута (Израиль). Точную стоимость рассчитает координатор.", url: "/prices" },
};

export default function Page() {
  return <Client />;
}
