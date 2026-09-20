"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function NewsClient({ news = [] }) {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "newsEyebrow")} crumb={t(lang, "newsEyebrow")} subtitle={t(lang, "pgNewsSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link href={`/news/${n.slug}`} className="card card-hover group h-full overflow-hidden">
                {n.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={n.image} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-base font-bold leading-snug text-body">{n.title}</h2>
                  {n.excerpt && <p className="text-sm text-muted">{n.excerpt}</p>}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
