"use client";
import Link from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import Counter from "@/components/Counter";
import SectionTitle from "@/components/SectionTitle";
import DoctorCard from "@/components/DoctorCard";
import CTASection from "@/components/CTASection";
import { site, stats, offers, departments } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

export default function HomeClient({ doctors = [], diseasesByCategory = [], reviews = [], news = [] }) {
  const { lang } = useLang();
  const trust = [
    { label: { ru: "Под контролем Минздрава Израиля", en: "Overseen by Israel's Ministry of Health" } },
    { label: { ru: "Реальные отзывы пациентов", en: "Real patient reviews" } },
    { label: { ru: "Частная клиника с 1935 года", en: "Private clinic since 1935" } },
    { label: { ru: "Сопровождение на вашем языке", en: "Support in your language" } },
  ];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={site.heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-blue/75 to-brand-blue/40" />
        <div className="wrap relative flex min-h-[560px] flex-col justify-center py-20">
          <Reveal>
            <span className="inline-block rounded-pill bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              {t(lang, "headerTagline")}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-5xl font-extrabold leading-none text-brand-green md:text-7xl">Assuta</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-2xl font-light text-white md:text-3xl">{t(lang, "heroSub")}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <a href={site.mapUrl} target="_blank" rel="noreferrer"
               className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
              {pick(site.address, lang)}
            </a>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#request" className="btn-green !px-8 !py-4 text-base">{t(lang, "freeConsult")}</a>
              <Link href="/doctors" className="inline-flex items-center justify-center rounded-pill border border-white/60 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-brand-blue">
                {t(lang, "ourDoctors")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 -mt-10">
        <div className="wrap">
          <div className="grid items-stretch gap-y-8 rounded-xl2 bg-surface p-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full lg:border-l lg:border-line lg:first:border-l-0">
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <div className="text-5xl font-extrabold text-brand-green">
                    <Counter value={s.num} />{s.unit ? <span className="text-3xl font-bold"> {pick(s.unit, lang)}</span> : null}
                  </div>
                  <div className="mt-5 text-sm font-medium text-muted">{pick(s.label, lang)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="mt-10 border-y border-line bg-surface2 py-7">
        <div className="wrap grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
          {trust.map((it, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-sm font-semibold leading-snug text-body">{pick(it.label, lang)}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WE OFFER */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "offersEyebrow")} title={t(lang, "offersTitle")} />
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <div className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="h-52 overflow-hidden">
                    <img src={o.img} alt={pick(o.title, lang)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-xl font-bold text-body">{pick(o.title, lang)}</h3>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">{pick(o.desc, lang)}</p>
                    <Link href={o.href} className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase text-brand-green group-hover:text-brand-blue dark:group-hover:text-accent">{t(lang, "learnMore")}<Arrow /></Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-surface2 py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "deptEyebrow")} title={t(lang, "deptTitle")} subtitle={t(lang, "deptSub")} />
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {departments.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 4) * 0.06} className="h-full">
                <Link href={`/departments/${d.slug}`} className="card card-hover group flex h-full items-center gap-4 p-5 sm:flex-col sm:items-start sm:gap-0 sm:p-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-1 text-lg font-bold text-body sm:mb-2">{pick(d.title, lang)}</h3>
                    <p className="text-sm text-muted">{pick(d.desc, lang)}</p>
                  </div>
                  <Arrow dir="chevron" className="flex-none text-muted sm:hidden" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "docEyebrow")} title={t(lang, "docTitle")} subtitle={t(lang, "docSub")} />
          <div className="grid grid-cols-2 items-stretch gap-5 md:grid-cols-4">
            {doctors.slice(0, 8).map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 4) * 0.06} className="h-full">
                <DoctorCard doc={doc} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/doctors" className="btn-blue">{t(lang, "allDoctors")}</Link>
          </div>
        </div>
      </section>

      {/* DISEASES */}
      <section className="bg-surface2 py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "disEyebrow")} title={t(lang, "disTitle")} subtitle={t(lang, "disSub")} />
          <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diseasesByCategory.map((cat, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08} className="h-full">
                <div className="card h-full p-6">
                  <h3 className="mb-4 break-words text-lg font-bold text-title">{pick(cat.category, lang)}</h3>
                  <ul className="space-y-3">
                    {cat.items.slice(0, 6).map((it) => (
                      <li key={it.slug}><Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{pick(it.title, lang)}</Link></li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/diseases" className="btn-blue">{t(lang, "allDiseases")}</Link>
          </div>
        </div>
      </section>

      <CTASection />

      {/* NEWS */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "newsEyebrow")} title={t(lang, "newsTitle")} />
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.1} className="h-full">
                <Link href={n.slug ? `/news/${n.slug}` : "/news"} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={n.img} alt={pick(n.title, lang)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-base font-bold leading-snug text-body">{pick(n.title, lang)}</h3>
                    <p className="text-sm text-muted">{pick(n.excerpt, lang)}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface2 py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "reviewsEyebrow")} title={t(lang, "reviewsTitle")} />
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={(i % 2) * 0.08} className="h-full">
                <div className="card h-full p-7">
                  <div className="mb-3 text-sm font-bold text-brand-green">5 из 5</div>
                  <p className="mb-5 italic text-body/80">«{pick(r.text, lang)}»</p>
                  <div className="text-sm font-bold text-body">{r.author}</div>
                  <div className="text-xs text-muted">{pick(r.country, lang)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
