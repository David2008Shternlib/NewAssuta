"use client";
import Link from "@/components/LocaleLink";
import PageHero from "@/components/PageHero";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { t, cms } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function SearchClient({ q = "", results }) {
  const { lang } = useLang();
  const en = lang === "en";
  const { doctors = [], diseases = [], news = [], total = 0 } = results || {};

  const label = {
    title: en ? "Search" : "Поиск по сайту",
    sub: en
      ? "Find a doctor, a condition or an article."
      : "Найдите врача, заболевание или статью.",
    placeholder: en ? "For example: oncology, MRI, Cohen" : "Например: рак груди, МРТ, Гринберг",
    button: en ? "Find" : "Найти",
    doctors: en ? "Doctors" : "Врачи",
    diseases: en ? "Conditions" : "Заболевания",
    news: en ? "Articles" : "Статьи и новости",
    found: en ? "Found" : "Найдено",
    nothing: en ? "Nothing found for" : "Ничего не нашлось по запросу",
    hint: en
      ? "Try a shorter word or check the spelling. You can also call us — the coordinator will help."
      : "Попробуйте слово покороче или проверьте написание. Можно просто позвонить — координатор подскажет.",
    startHint: en
      ? "Enter at least two characters."
      : "Введите хотя бы два символа.",
  };

  return (
    <>
      <PageHero title={label.title} crumb={label.title} subtitle={label.sub} />

      <section className="py-12">
        <div className="wrap">
          {/* обычная форма: работает и без JavaScript */}
          <form action="/search" method="get" className="mx-auto flex max-w-2xl gap-3">
            <input
              type="search"
              name="q"
              defaultValue={q}
              autoFocus
              placeholder={label.placeholder}
              aria-label={label.title}
              className="h-14 flex-1 rounded-lg border-0 bg-page px-5 text-body shadow-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brand-green"
            />
            <button type="submit" className="btn-blue whitespace-nowrap !px-7">{label.button}</button>
          </form>

          {q.length >= 2 && (
            <p className="mt-6 text-center text-sm text-muted">
              {total > 0
                ? `${label.found}: ${total}`
                : `${label.nothing} «${q}»`}
            </p>
          )}
          {q.length >= 2 && total === 0 && (
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">{label.hint}</p>
          )}
          {q.length > 0 && q.length < 2 && (
            <p className="mt-6 text-center text-muted">{label.startHint}</p>
          )}
        </div>
      </section>

      {doctors.length > 0 && (
        <section className="pb-14">
          <div className="wrap">
            <h2 className="mb-5 text-xl font-bold text-title">
              {label.doctors} <span className="ml-1 text-base font-normal text-muted">{doctors.length}</span>
            </h2>
            <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-4">
              {doctors.map((d) => (<DoctorCard key={d.slug} doc={d} />))}
            </div>
          </div>
        </section>
      )}

      {diseases.length > 0 && (
        <section className="bg-surface2 py-14">
          <div className="wrap">
            <h2 className="mb-5 text-xl font-bold text-title">
              {label.diseases} <span className="ml-1 text-base font-normal text-muted">{diseases.length}</span>
            </h2>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {diseases.map((d) => (
                <li key={d.slug}>
                  <Link href={`/diseases/${d.slug}`} className="link-underline text-sm">{cms(d, "title", lang)}</Link>
                  {d.category && <span className="ml-2 text-xs text-muted">{d.category}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {news.length > 0 && (
        <section className="py-14">
          <div className="wrap">
            <h2 className="mb-5 text-xl font-bold text-title">
              {label.news} <span className="ml-1 text-base font-normal text-muted">{news.length}</span>
            </h2>
            <ul className="space-y-3">
              {news.map((n) => (
                <li key={n.slug}>
                  <Reveal>
                    <Link href={`/news/${n.slug}`} className="link-underline font-semibold text-body">{cms(n, "title", lang)}</Link>
                    {n.excerpt && <p className="mt-1 text-sm text-muted">{n.excerpt.slice(0, 160)}</p>}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
