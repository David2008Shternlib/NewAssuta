import NewsClient from "./NewsClient";
import { getAllNews } from "@/lib/sanity";

export const revalidate = 3600;
export const metadata = {
  title: "Медицинские новости — клиника Ассута",
  description: "Новые технологии, методы лечения и полезные материалы от клиники Ассута в Израиле.",
  alternates: { canonical: "/news" },
  openGraph: { title: "Медицинские новости | Assuta", description: "Новости клиники Ассута.", url: "/news" },
};
export default async function Page() {
  const news = await getAllNews();
  return <NewsClient news={news} />;
}
