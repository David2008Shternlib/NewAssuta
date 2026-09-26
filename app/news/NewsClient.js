"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { t, cms } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";
import Arrow from "@/components/Arrow";

export default function NewsClient({ news = [] }) {
  const { lang } = useLang();
  return (
    <>
      <PageHero title={t(lang, "newsEyebrow")} crumb={t(lang, "newsEyebrow")} subtitle={t(lang, "pgNewsSub")} />
      <section className="py-16">
        <div className="wrap grid items-stretch gap-6 md:grid-cols-3">
          {news.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.06} className="h-full">
              <Link href={`/news/${n.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                {n.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={n.image} alt={cms(n, "title", lang)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="mb-2 text-base font-bold leading-snug text-body">{cms(n, "title", lang)}</h2>
                  {cms(n, "excerpt", lang) && <p className="text-sm text-muted">{cms(n, "excerpt", lang)}</p>}
                  {/* Подпись прижата к низу карточки: заголовки разной длины,
                      иначе кнопка прыгала бы по высоте от карточки к карточке. */}
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent">
                    {t(lang, "read")}<Arrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
