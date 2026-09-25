"use client";
import { useState } from "react";
import { useLang } from "./LangProvider";

/**
 * Видео с YouTube без платы за него на каждой загрузке страницы.
 *
 * Обычная вставка YouTube тянет около мегабайта скриптов сразу, даже если
 * посетитель никогда не нажмёт «играть» — именно это аудит называет главной
 * причиной медленной загрузки оригинального сайта.
 *
 * Здесь до клика показывается только обложка (~30 КБ). Настоящий плеер
 * подключается в момент нажатия и сразу запускается — для посетителя
 * разница только в том, что первый экран открывается заметно быстрее.
 *
 * Домен youtube-nocookie.com: до клика YouTube не ставит куки.
 */
export default function VideoEmbed({ id, title, poster }) {
  const [playing, setPlaying] = useState(false);
  const { lang } = useLang();

  const caption = title || (lang === "en" ? "Video about the clinic" : "Видео о клинике");
  const cover = poster || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

  if (playing) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl2 bg-black shadow-soft">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={caption}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={lang === "en" ? `Play: ${caption}` : `Смотреть: ${caption}`}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl2 bg-brand-dark shadow-soft"
    >
      <img
        src={cover}
        alt={caption}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-brand-dark/25 transition-colors group-hover:bg-brand-dark/10" />

      <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-green shadow-soft transition-transform duration-300 group-hover:scale-110">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-white" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </span>

      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/80 to-transparent p-5 text-left text-sm font-semibold text-white">
        {caption}
      </span>
    </button>
  );
}
