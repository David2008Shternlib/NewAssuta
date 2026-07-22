import Client from "./NewsClient";

export const metadata = {
  title: "Медицинские новости — клиника Ассута",
  description: "Новые технологии, методы лечения и полезные материалы от клиники Ассута в Израиле.",
  alternates: { canonical: "/news" },
  openGraph: { title: "Медицинские новости — клиника Ассута | Assuta", description: "Новые технологии, методы лечения и полезные материалы от клиники Ассута в Израиле.", url: "/news" },
};

export default function Page() {
  return <Client />;
}
