"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";

/**
 * Текст отзыва со свёрткой до нескольких строк.
 *
 * Отзывы приходят из CMS и бывают очень разной длины: один в три строки,
 * другой на полтора экрана телефона. Длинный выталкивает за пределы экрана всё,
 * что идёт следом, и до цен и шагов лечения читатель уже не доходит.
 *
 * Поэтому текст обрезается по числу строк, а не по числу символов: обрезка по
 * символам на узком экране даёт то три строки, то девять. Кнопка появляется
 * только если текст действительно не поместился — у коротких отзывов её нет.
 */
export default function ReviewText({ text, lines = 8, className = "" }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const ref = useRef(null);

  // Меряем только в свёрнутом состоянии: в развёрнутом scrollHeight равен
  // clientHeight, и кнопка «Свернуть» исчезла бы сама собой.
  const measure = useCallback(() => {
    const el = ref.current;
    if (!el || open) return;
    setNeedsToggle(el.scrollHeight > el.clientHeight + 1);
  }, [open]);

  useEffect(() => {
    measure();
    const el = ref.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, text]);

  const clampStyle = open
    ? undefined
    : { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: lines, overflow: "hidden" };

  return (
    <>
      <p ref={ref} style={clampStyle} className={className}>
        «{text}»
      </p>

      {needsToggle && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:hover:text-accent"
        >
          {t(lang, open ? "showLess" : "showMore")}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={open ? "rotate-180" : ""}
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}
    </>
  );
}
