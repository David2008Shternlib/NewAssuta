import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { news } from "@/data/site";

export const metadata = { title: "Медицинские новости — клиника Ассута" };

export default function NewsPage() {
  return (
    <>
      <PageHero title="Медицинские новости" crumb="Новости" subtitle="Новые технологии, методы лечения и полезные материалы." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08}>
              <Link href="/news" className="card card-hover group h-full overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={n.img} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-base font-bold leading-snug text-brand-ink">{n.title}</h2>
                  <p className="text-sm text-brand-ink/60">{n.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
