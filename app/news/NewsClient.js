"use client";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { news } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function NewsPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "newsEyebrow")} crumb={t(lang, "newsEyebrow")} subtitle={t(lang, "pgNewsSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={i * 0.08} className="h-full">
              <Link href="/news" className="card card-hover group flex h-full flex-col overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={n.img} alt={pick(n.title, lang)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h2 className="mb-2 text-base font-bold leading-snug text-body">{pick(n.title, lang)}</h2>
                  <p className="text-sm text-muted">{pick(n.excerpt, lang)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
