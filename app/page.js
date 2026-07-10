import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import DoctorCard from "@/components/DoctorCard";
import CTASection from "@/components/CTASection";
import { site, stats, offers, departments, diseasesByCategory, doctors, news, reviews } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={site.heroBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-blue/70 to-brand-blue/30" />
        <div className="wrap relative flex min-h-[560px] flex-col justify-center py-20">
          <Reveal>
            <span className="inline-block rounded-pill bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              {site.tagline}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 text-5xl font-extrabold leading-none text-brand-green md:text-7xl">Assuta</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-2xl font-light text-white md:text-3xl">
              Современный частный медицинский центр в Израиле
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#request" className="btn-green !px-8 !py-4 text-base">Бесплатная консультация</a>
              <Link href="/doctors" className="inline-flex items-center justify-center rounded-pill border border-white/60 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white hover:text-brand-blue">
                Наши врачи
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 -mt-10">
        <div className="wrap">
          <div className="grid gap-4 rounded-xl2 bg-white p-6 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="px-4 py-3 text-center">
                  <div className="text-4xl font-bold text-brand-green">{s.num}</div>
                  <div className="mt-2 text-sm font-medium text-brand-ink/70">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WE OFFER */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Что мы предлагаем" title="Преимущества клиники Ассута" />
          <div className="grid gap-6 md:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <div className="card card-hover group h-full overflow-hidden">
                  <div className="h-52 overflow-hidden">
                    <img src={o.img} alt={o.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-brand-ink">{o.title}</h3>
                    <p className="mb-5 text-sm leading-relaxed text-brand-ink/60">{o.desc}</p>
                    <Link href={o.href} className="text-sm font-semibold uppercase text-brand-green group-hover:text-brand-blue">Узнать больше →</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="bg-brand-bg py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Более 20 специальностей" title="Направления лечения" subtitle="От пластической хирургии до нейрохирургии — комплексная помощь по всем ключевым направлениям." />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {departments.map((d, i) => (
              <Reveal key={d.slug} delay={(i % 4) * 0.06}>
                <Link href="/departments" className="card card-hover group flex h-full flex-col p-6">
                  <div className="mb-4 text-4xl">{d.icon}</div>
                  <h3 className="mb-2 text-lg font-bold text-brand-ink">{d.title}</h3>
                  <p className="text-sm text-brand-ink/60">{d.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Более 3000 врачей" title="Наши ведущие специалисты" subtitle="Профессора и врачи высшей категории с мировым именем." />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {doctors.slice(0, 8).map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 4) * 0.06}>
                <DoctorCard doc={doc} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/doctors" className="btn-blue">Все врачи</Link>
          </div>
        </div>
      </section>

      {/* DISEASES */}
      <section className="bg-brand-bg py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Клиника Ассута" title="Что мы лечим" subtitle="Схема комплексного ведения пациента и техническое оснащение отвечают высочайшим медицинским стандартам." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {diseasesByCategory.map((cat, i) => (
              <Reveal key={cat.category} delay={(i % 3) * 0.08}>
                <div className="card h-full p-6">
                  <h3 className="mb-4 text-lg font-bold text-brand-blue">{cat.category}</h3>
                  <ul className="space-y-3">
                    {cat.items.slice(0, 6).map((it) => (
                      <li key={it.slug}>
                        <Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{it.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/diseases" className="btn-blue">Все заболевания</Link>
          </div>
        </div>
      </section>

      {/* CTA + FORM */}
      <CTASection />

      {/* NEWS */}
      <section className="py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Медицинские новости" title="Статьи и технологии" />
          <div className="grid gap-6 md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.1}>
                <Link href="/news" className="card card-hover group h-full overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={n.img} alt={n.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-base font-bold leading-snug text-brand-ink">{n.title}</h3>
                    <p className="text-sm text-brand-ink/60">{n.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-brand-bg py-20">
        <div className="wrap">
          <SectionTitle eyebrow="Отзывы пациентов" title="Нам доверяют" />
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal key={r.author} delay={(i % 2) * 0.08}>
                <div className="card h-full p-7">
                  <div className="mb-3 text-brand-green">★★★★★</div>
                  <p className="mb-5 italic text-brand-ink/80">«{r.text}»</p>
                  <div className="text-sm font-bold text-brand-ink">{r.author}</div>
                  <div className="text-xs text-brand-ink/50">{r.country}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
