import HomeClient from "./HomeClient";
import { getAllDoctors, getAllDiseases, getReviews, getAllNews } from "@/lib/sanity";

export const revalidate = 3600;

export default async function Page() {
  const [doctors, diseases, reviews, newsRaw] = await Promise.all([
    getAllDoctors(), getAllDiseases(), getReviews(), getAllNews(),
  ]);

  const map = new Map();
  const diseasesByCategory = [];
  for (const d of diseases) {
    const c = d.category || "Другое";
    if (!map.has(c)) { const arr = []; map.set(c, arr); diseasesByCategory.push({ category: c, items: arr }); }
    map.get(c).push({ slug: d.slug, title: d.title });
  }
  const news = newsRaw.map((n) => ({ slug: n.slug, title: n.title, excerpt: n.excerpt, img: n.image }));

  return (
    <HomeClient
      doctors={doctors.slice(0, 8)}
      diseasesByCategory={diseasesByCategory.slice(0, 6)}
      reviews={reviews.slice(0, 4)}
      news={news.slice(0, 3)}
    />
  );
}
