"use client";
import Link from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import Arrow from "@/components/Arrow";
import VideoEmbed from "@/components/VideoEmbed";
import ReviewCard from "@/components/ReviewCard";
import { cdnImage } from "@/lib/img";
import SectionTitle from "@/components/SectionTitle";
import DoctorCard from "@/components/DoctorCard";
import CTASection from "@/components/CTASection";
import DeptIcon from "@/components/DeptIcon";
import { site, videoId, homeTiles, homeStats, homePrices, homeImages, cmsLabel } from "@/data/site";
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

// Растушёвка краёв фотографии в первом экране.
//
// Снимок лежит справа и занимает примерно половину ширины, как в макете.
// Маска гасит его к краям неравномерно: плотное ядро смещено вправо, слева
// прозрачность нарастает раньше — поэтому кадр не обрывается вертикальной
// линией по центру экрана, а растворяется в фоне под текстом.
// Снимок в плитке направления уходит под текст мягким краем — как в макете,
// где фотография занимает правую часть карточки и растворяется к середине.
//
// Много промежуточных точек вместо трёх: переход идёт длинно и ровно,
// без заметной ступеньки. Это важнее всего в тёмной теме — снимки сняты
// на белом фоне, и при коротком градиенте на тёмной карточке возникала
// резкая светлая граница. Полная непрозрачность набирается к 86%, чтобы
// объект в правой части оставался читаемым.
const TILE_FADE =
  "linear-gradient(to right, transparent 0%, rgba(0,0,0,.05) 12%, rgba(0,0,0,.16) 24%, " +
  "rgba(0,0,0,.34) 36%, rgba(0,0,0,.55) 48%, rgba(0,0,0,.74) 60%, rgba(0,0,0,.88) 72%, " +
  "rgba(0,0,0,.97) 82%, #000 90%)";

// Широкий экран: снимок справа, текст слева, маска гасит кадр к краям.
const HERO_FADE =
  "radial-gradient(115% 130% at 78% 42%, #000 30%, rgba(0,0,0,.62) 58%, rgba(0,0,0,.22) 76%, transparent 92%)";

// Телефон: снимок делит верх экрана с заголовком — справа кадр, слева
// текст, как в макете.
//
// Работают два элемента. Распорка плавает (float) и заставляет строки
// заголовка укорачиваться рядом с картинкой — абсолютный снимок строки
// не двигает, текст лез бы прямо на него. Сам снимок при этом лежит
// абсолютом и крупнее распорки: он выходит за её границы влево и вниз,
// заезжая под текст. Так не видно ни одного края кадра — к ним он
// полностью растворяется в фоне, а не обрывается прямой линией.
//
// Размер градиента намеренно меньше самой картинки (92% × 86%): прозрачность
// должна дойти до нуля ВНУТРИ кадра, не доходя до его краёв. Раньше градиент
// был крупнее картинки — у нижней и левой границ оставалось процентов пять
// непрозрачности, и они проступали на белом ровной линией. Теперь в любой
// точке края маска уже на нуле.
const HERO_FADE_MOBILE =
  "radial-gradient(92% 86% at 90% 12%, #000 18%, rgba(0,0,0,.75) 38%, rgba(0,0,0,.35) 56%, rgba(0,0,0,.12) 70%, transparent 84%)";

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
          <>
            {/* Широкий экран: снимок справа */}
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[56%] md:block" aria-hidden="true">
              <img
                src={homeImages.hero}
                alt=""
                className="h-full w-full object-cover"
                style={{ maskImage: HERO_FADE, WebkitMaskImage: HERO_FADE }}
              />
              {/* Заливка слева направо: текст занимает левую половину,
                  справа кадр остаётся открытым. */}
              <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/45 to-transparent" />
            </div>
          </>
        ) : (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-surface via-page to-surface2" aria-hidden="true" />
        )}

        {/* Телефон: снимок крупнее распорки и выходит за её границы —
            влево под заголовок и вниз под абзац. Лежит до блока с текстом,
            поэтому текст рисуется поверх. */}
        {homeImages.hero && (
          <img
            src={homeImages.hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="pointer-events-none absolute right-0 top-0 h-80 w-[96%] object-cover md:hidden"
            style={{ maskImage: HERO_FADE_MOBILE, WebkitMaskImage: HERO_FADE_MOBILE }}
          />
        )}

        {/* Переход к следующей секции. Первый экран белый, дальше идёт
            светло-синий фон страницы — на стыке получалась отчётливая
            горизонтальная линия. Здесь белый плавно уходит в цвет фона,
            и границы не видно. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-page/60 to-page" aria-hidden="true" />

        <div className="wrap relative py-10 md:py-24">
          <div className="max-w-2xl md:max-w-[52%]">
            {/* Снимок и заголовок лежат в одном блоке намеренно: обтекание
                действует только на строки внутри того же контейнера, что и
                плавающий элемент. Если развести их по разным обёрткам
                Reveal (у неё will-change — она может создать собственный
                контекст форматирования), строки перестанут укорачиваться
                рядом с картинкой. */}
            <Reveal>
              {/* Распорка: невидима, нужна только чтобы строки заголовка
                  обтекали картинку. Сам снимок — ниже, абсолютом. */}
              {homeImages.hero && (
                <span aria-hidden="true" className="float-right -mr-4 ml-3 block h-40 w-[50%] md:hidden" />
              )}
              <div className="eyebrow mb-3 md:mb-4">{t(lang, "hpEyebrow")}</div>
              {/* На телефоне заголовок мельче: рядом с картинкой под него
                  остаётся около 180px, и «медицинский» в 36px туда не
                  помещается — слово переносится посреди. */}
              <h1 className="section-title text-[26px] leading-[1.15] sm:text-4xl sm:leading-[1.1] md:text-5xl">{t(lang, "hpTitle")}</h1>
            </Reveal>
            <Reveal delay={0.12} className="clear-right">
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
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/15 text-white">
                    <Arrow dir="chevron" />
                  </span>
                </a>

                {whatsapp && (
                  <a href={whatsapp.href} target="_blank" rel="noreferrer"
                     className="group flex items-center gap-4 rounded-card border-2 border-brand-green/35 bg-surface px-5 py-4 shadow-btn transition-colors hover:border-brand-green">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-btn bg-brand-green/10 text-brand-green">
                      <PromiseIcon d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3zm-3 6c0-.6.4-1 1-1 .4 0 .7.3.9.7l.6 1.4c.1.4 0 .8-.3 1l-.5.4c.5 1 1.3 1.8 2.3 2.3l.4-.5c.2-.3.6-.4 1-.3l1.4.6c.4.2.7.5.7.9 0 .6-.4 1-1 1A7 7 0 0 1 9 9z" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold leading-snug text-body">{t(lang, "hpCta2")}</span>
                      <span className="block text-xs text-muted">{t(lang, "hpCta2Sub")}</span>
                    </span>
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <Arrow dir="chevron" />
                    </span>
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
          {/* Две плитки в ряд — с 640px, как в макете (он нарисован под
              широкий экран). На телефоне половина ширины оставляет под
              заголовок меньше 60px: туда не влезает «Нейрохирургия» ни при
              каком размере шрифта — слово рвётся посередине. Поэтому до
              640px плитки идут по одной, с иконкой и фотографией на месте. */}
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {homeTiles.map((tile, i) => (
              <Reveal key={tile.href + i} delay={(i % 4) * 0.05} className="h-full">
                {/* Фотография — обычный элемент потока, а не absolute: так
                    флексбокс сам гарантирует, что текст под неё не заедет.
                    Раньше снимок лежал поверх колонки с текстом, и длинные
                    названия уходили под него. */}
                <Link href={tile.href} className="card card-hover group relative flex h-full items-stretch overflow-hidden">
                  <div className="flex min-w-0 flex-1 items-center gap-2.5 p-3.5 pr-1 sm:gap-3.5 sm:p-4 sm:pr-1">
                    <DeptIcon slug={tile.icon} size="sm" />
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-0.5 flex min-h-[2.4rem] hyphens-auto items-start text-sm font-bold leading-snug text-body sm:min-h-[1.5rem] sm:text-base">{pick(tile.title, lang)}</h3>
                      <p className="min-h-[2.5rem] hyphens-auto text-xs leading-snug text-muted sm:text-sm">{pick(tile.desc, lang)}</p>
                    </div>
                  </div>

                  {tile.img && (
                    <span aria-hidden="true" className="pointer-events-none relative w-[38%] flex-none sm:w-[40%] lg:w-[30%]">
                      <img
                        src={tile.img}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={{ maskImage: TILE_FADE, WebkitMaskImage: TILE_FADE }}
                      />
                    </span>
                  )}

                  {/* Кружок со стрелкой: без него плитка не читается как
                      кнопка — на телефоне наведения нет, и подсказать, что
                      это ссылка, больше нечем. */}
                  <span className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-brand-blue shadow-sm ring-1 ring-line backdrop-blur transition-colors group-hover:bg-brand-blue group-hover:text-white dark:text-accent">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ЧЕТЫРЕ ОБЕЩАНИЯ */}
      <section className="bg-surface py-10">
        {/* По две карточки в ряд уже на телефоне: это справочные блоки без
            кнопок, по одной в ряд они растягивали страницу на несколько
            экранов. Запас высоты под вторую строку поэтому снова нужен
            на всех ширинах — соседи в ряду есть везде. */}
        <div className="wrap grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {PROMISES.map((p, i) => (
            <Reveal key={p.key} delay={(i % 4) * 0.05}>
              <div className="flex gap-3.5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-btn bg-brand-blue/10 text-brand-blue dark:bg-white/10 dark:text-accent">
                  <PromiseIcon d={p.d} />
                </span>
                <div className="min-w-0">
                  {/* Две строки под заголовок: иначе у соседей в ряду подписи
                      стоят на разной высоте. На телефоне соседей нет — запас
                      не нужен, поэтому с sm:. */}
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 rounded-xl2 bg-surface p-6 shadow-soft sm:p-8 lg:grid-cols-4">
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
                      <div className="flex min-h-[2.75rem] items-center whitespace-nowrap text-2xl font-extrabold leading-none text-title sm:text-4xl">{s.value}</div>
                      <div className="mt-2 text-sm font-medium leading-snug text-muted">{t(lang, s.key)}</div>
                    </>
                  ) : (
                    <div className="flex min-h-[2.75rem] items-center text-sm font-bold leading-snug text-title sm:text-lg">{t(lang, s.key)}</div>
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
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                  <ReviewCard review={r} lines={8} />
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
      <section className="bg-surface py-14 md:py-20">
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
                  {/* Кнопка стоит у первого шага: именно он и есть действие,
                      остальные три происходят уже на нашей стороне.
                      min-h у текста выше — чтобы кнопка не поднимала
                      первую колонку относительно соседних. */}
                  {i === 0 && (
                    <a href="#request" className="btn-blue mt-1 w-full justify-center !py-2.5 !text-xs sm:w-auto sm:!px-5">
                      {t(lang, "leaveRequest")}
                    </a>
                  )}
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
          <VideoEmbed id={videoId} />
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
                    <img src={cdnImage(n.img, 640)} alt={cms(n, "title", lang)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
