"use client";
import Link from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import VideoEmbed from "@/components/VideoEmbed";
import SectionTitle from "@/components/SectionTitle";
import DoctorCard from "@/components/DoctorCard";
import CTASection from "@/components/CTASection";
import DeptIcon from "@/components/DeptIcon";
import { site, homeTiles, homeStats, homePrices, homeImages, cmsLabel } from "@/data/site";
import { pick, t, cms } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

// Иконки обещаний под первым экраном. Нарисованы здесь, а не в DeptIcon:
// там иконки направлений, а это другой набор и другая роль.
const PromiseIcon = ({ d }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const PROMISES = [
  { key: "hpPromise1", d: "M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zm-3 5a3 3 0 0 1-3 2h-2" },
  { key: "hpPromise2", d: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm5 12l5 5" },
  { key: "hpPromise3", d: "M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 6h6M9 13h6M9 17h3" },
  { key: "hpPromise4", d: "M12 3l8 4v5c0 4.4-3.4 8.3-8 9-4.6-.7-8-4.6-8-9V7l8-4zm-3 9l2 2 4-4" },
];

const STEPS = ["hpStep1", "hpStep2", "hpStep3", "hpStep4"];
const STEP_ICONS = ["stepRequest", "stepDoctors", "stepPlan", "stepTrip"];

// Растушёвка краёв фотографии в первом экране: к краям кадра прозрачность
// нарастает, поэтому снимок переходит в фон без видимой границы.
const HERO_FADE =
  "radial-gradient(125% 105% at 72% 42%, #000 32%, rgba(0,0,0,.55) 62%, transparent 82%)";

export default function HomeClient({ doctors = [], diseasesByCategory = [], reviews = [], news = [] }) {
  const { lang } = useLang();
  const whatsapp = site.messengers.find((m) => m.label === "WhatsApp");

  return (
    <>
      {/* ПЕРВЫЙ ЭКРАН */}
      <section className="relative overflow-hidden bg-surface">
        {/* Фотография медцентра. Края растушёваны маской, как в макете: фото
            не обрывается рамкой, а растворяется в фоне страницы. Маску делаем
            именно маской, а не наложенным градиентом, — иначе в тёмной теме
            пришлось бы красить «затухание» вторым цветом и оно бы отслаивалось.
            Слева поверх фото лежит заливка фона, чтобы текст читался. */}
        {homeImages.hero ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <img
              src={homeImages.hero}
              alt=""
              className="h-full w-full object-cover"
              style={{ maskImage: HERO_FADE, WebkitMaskImage: HERO_FADE }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/15" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface via-page to-surface2" aria-hidden="true" />
        )}

        <div className="wrap relative py-14 md:py-20">
          <div className="max-w-2xl">
            <Reveal>
              <div className="eyebrow mb-4">{t(lang, "hpEyebrow")}</div>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="section-title text-4xl leading-[1.1] md:text-5xl">{t(lang, "hpTitle")}</h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{t(lang, "hpLead")}</p>
            </Reveal>

            {/* Два действия с разной ценой входа, как в макете: заявка для
                готовых и мессенджер для тех, кто пока не оставляет телефон. */}
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-3">
                <a href="#request"
                   className="group flex items-center gap-4 rounded-card bg-brand-blue px-5 py-4 text-white shadow-btn transition-colors hover:bg-brand-dark">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-btn bg-white/15">
                    <PromiseIcon d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 6h6M9 13h6M9 17h3" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold leading-snug">{t(lang, "hpCta1")}</span>
                    <span className="block text-xs text-white/70">{t(lang, "hpCta1Sub")}</span>
                  </span>
                  <Arrow dir="chevron" className="flex-none text-white/70" />
                </a>

                {whatsapp && (
                  <a href={whatsapp.href} target="_blank" rel="noreferrer"
                     className="group flex items-center gap-4 rounded-card border border-line bg-surface px-5 py-4 shadow-card transition-colors hover:border-brand-green/60">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-btn bg-brand-green/10 text-brand-green">
                      <PromiseIcon d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3zm-3 6c0-.6.4-1 1-1 .4 0 .7.3.9.7l.6 1.4c.1.4 0 .8-.3 1l-.5.4c.5 1 1.3 1.8 2.3 2.3l.4-.5c.2-.3.6-.4 1-.3l1.4.6c.4.2.7.5.7.9 0 .6-.4 1-1 1A7 7 0 0 1 9 9z" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-snug text-body">{t(lang, "hpCta2")}</span>
                      <span className="block text-xs text-muted">{t(lang, "hpCta2Sub")}</span>
                    </span>
                    <Arrow dir="chevron" className="flex-none text-muted/60" />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* С ЧЕМ ВАМ ПОМОЧЬ */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionTitle title={t(lang, "hpHelpTitle")} subtitle={t(lang, "hpHelpSub")} />
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homeTiles.map((tile, i) => (
              <Reveal key={tile.href + i} delay={(i % 4) * 0.05} className="h-full">
                <Link href={tile.href} className="card card-hover group flex h-full items-start gap-4 overflow-hidden p-4">
                  {tile.img ? (
                    <img src={tile.img} alt="" className="h-14 w-14 flex-none rounded-btn object-cover" />
                  ) : (
                    <DeptIcon slug={tile.icon} size="sm" />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-0.5 flex min-h-[1.5rem] items-start text-base font-bold leading-snug text-body">{pick(tile.title, lang)}</h3>
                    <p className="min-h-[2.5rem] text-sm leading-snug text-muted">{pick(tile.desc, lang)}</p>
                  </div>
                  <Arrow dir="chevron" className="mt-3.5 flex-none text-muted/60" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ЧЕТЫРЕ ОБЕЩАНИЯ */}
      <section className="border-y border-line bg-surface py-10">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.key} delay={(i % 4) * 0.05}>
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-btn bg-brand-blue/10 text-brand-blue dark:bg-white/10 dark:text-accent">
                  <PromiseIcon d={p.d} />
                </span>
                <div className="min-w-0">
                  {/* Две строки под заголовок: иначе у соседей в ряду подписи
                      стоят на разной высоте. */}
                  <div className="flex min-h-[2.25rem] items-start text-sm font-bold leading-snug text-body">{t(lang, p.key)}</div>
                  <div className="mt-0.5 text-xs text-muted">{t(lang, `${p.key}Sub`)}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ЦИФРЫ */}
      <section className="py-12 md:py-16">
        <div className="wrap">
          <div className="grid gap-y-8 rounded-xl2 bg-surface p-8 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
            {homeStats.map((s, i) => (
              <Reveal key={s.key} delay={(i % 4) * 0.06} className="h-full">
                <div className="flex h-full flex-col items-center justify-start border-line px-4 text-center lg:border-l lg:first:border-l-0">
                  <DeptIcon slug={s.icon} size="sm" className="mb-3" />
                  {/* У четвёртой колонки числа нет — подпись занимает его место
                      и набрана так же крупно, как в макете. Поэтому высота
                      блока с числом фиксирована: иначе подписи соседних
                      колонок стояли бы на разной высоте.
                      whitespace-nowrap: «1 000 000+» иначе разрывается по
                      пробелам внутри числа. */}
                  {s.value ? (
                    <>
                      <div className="flex min-h-[2.75rem] items-center whitespace-nowrap text-3xl font-extrabold leading-none text-title sm:text-4xl">{s.value}</div>
                      <div className="mt-2 text-sm font-medium leading-snug text-muted">{t(lang, s.key)}</div>
                    </>
                  ) : (
                    <div className="flex min-h-[2.75rem] items-center text-base font-bold leading-snug text-title sm:text-lg">{t(lang, s.key)}</div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ВТОРОЕ МНЕНИЕ */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <Reveal>
            <div className="card flex flex-col items-start gap-6 overflow-hidden p-7 md:flex-row md:items-center md:p-9">
              <div className="min-w-0 flex-1">
                <h2 className="section-title text-2xl md:text-3xl">{t(lang, "hpSecondTitle")}</h2>
                <p className="mt-3 text-muted">{t(lang, "hpSecondSub")}</p>
                <a href="#request" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent">
                  {t(lang, "hpSecondLink")}<Arrow />
                </a>
              </div>
              {homeImages.secondOpinion && (
                <img src={homeImages.secondOpinion} alt="" className="h-40 w-full flex-none rounded-card object-cover md:w-72" />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ВЕДУЩИЕ СПЕЦИАЛИСТЫ */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="section-title text-2xl md:text-3xl">{t(lang, "hpDoctorsTitle")}</h2>
            <Link href="/doctors" className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent">
              {t(lang, "allDoctors")}<Arrow />
            </Link>
          </div>
          <div className="grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4">
            {doctors.slice(0, 4).map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 4) * 0.06} className="h-full">
                <DoctorCard doc={doc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ИСТОРИИ ПАЦИЕНТОВ И ЦЕНЫ */}
      <section className="pb-14 md:pb-20">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="section-title text-2xl">{t(lang, "hpStoriesTitle")}</h2>
              <Link href="/reviews" className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent">
                {t(lang, "hpStoriesAll")}<Arrow />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {reviews.slice(0, 2).map((r, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="card p-6">
                    <p className="italic leading-relaxed text-body/85">«{pick(r.text, lang)}»</p>
                    <div className="mt-4 text-sm font-bold text-body">{r.author}</div>
                    <div className="text-xs text-muted">{pick(r.country, lang)}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="section-title text-2xl">{t(lang, "hpPricesTitle")}</h2>
              <Link href="/prices" className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent">
                {t(lang, "hpPricesAll")}<Arrow />
              </Link>
            </div>
            <Reveal>
              <div className="card divide-y divide-line overflow-hidden">
                {homePrices.map((row, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <span className="min-w-0 text-sm leading-snug text-body">{pick(row.title, lang)}</span>
                    <span className="flex-none text-sm font-bold text-title">{row.price || t(lang, "byRequest")}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* КАК НАЧАТЬ ЛЕЧЕНИЕ */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="wrap">
          <SectionTitle title={t(lang, "hpStepsTitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((key, i) => (
              <Reveal key={key} delay={(i % 4) * 0.06}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <DeptIcon slug={STEP_ICONS[i]} size="sm" />
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug text-body">{t(lang, key)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Блоки ниже макет не показывает — он обрезан на шагах. Оставлены,
          чтобы не терять ссылки на видео, каталог заболеваний и новости. */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "disEyebrow")} title={t(lang, "videoTitle")} />
          <VideoEmbed />
        </div>
      </section>

      <section className="bg-surface2 py-14 md:py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "disEyebrow")} title={t(lang, "disTitle")} subtitle={t(lang, "disSub")} />
          <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {diseasesByCategory.map((cat, i) => (
              <Reveal key={cat.category} delay={(i % 3) * 0.06} className="h-full">
                <div className="card h-full p-6">
                  <h3 className="mb-4 break-words text-lg font-bold text-title">{cmsLabel(cat.category, lang)}</h3>
                  <ul className="space-y-3">
                    {cat.items.slice(0, 6).map((it) => (
                      <li key={it.slug}>
                        <Link href={`/diseases/${it.slug}`} className="link-underline text-sm">{cms(it, "title", lang)}</Link>
                      </li>
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

      <section className="py-14 md:py-20">
        <div className="wrap">
          <SectionTitle eyebrow={t(lang, "newsEyebrow")} title={t(lang, "newsTitle")} />
          <div className="grid items-stretch gap-6 md:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.slug} delay={i * 0.1} className="h-full">
                <Link href={n.slug ? `/news/${n.slug}` : "/news"} className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={n.img} alt={cms(n, "title", lang)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-base font-bold leading-snug text-body">{cms(n, "title", lang)}</h3>
                    <p className="text-sm text-muted">{pick(n.excerpt, lang)}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue dark:group-hover:text-accent">
                      {t(lang, "read")}<Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
