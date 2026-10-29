"use client";
import { useEffect, useState } from "react";
import Link from "@/components/LocaleLink";
import { t } from "@/data/i18n";
import { useLang } from "./LangProvider";
import { ALL, NECESSARY, getConsent, setConsent } from "@/lib/consent";

/**
 * Сообщение о куки с настоящим выбором.
 *
 * Кнопка «Только необходимые» реально выключает аналитику: компонент Метрики
 * проверяет сохранённый ответ и без согласия не подключает счётчик вовсе.
 * Баннер, который ничего не меняет, хуже его отсутствия — он создаёт
 * видимость соблюдения правил.
 *
 * Показывается, пока выбор не сделан. Появляется с задержкой в полторы
 * секунды: мгновенная плашка поверх первого экрана выглядит агрессивно, а
 * человек всё равно сначала смотрит на заголовок.
 *
 * Онлайн-чат остаётся при любом ответе — это способ связаться с клиникой,
 * а не слежка. Подробности в комментарии к lib/consent.js.
 */
export default function CookieNotice() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (getConsent()) return;
    const timer = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const choose = (value) => {
    setConsent(value);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t(lang, "cookieTitle")}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5"
    >
      <div className="wrap">
        <div className="flex flex-col gap-4 rounded-xl2 border border-line bg-surface p-5 shadow-soft sm:flex-row sm:items-center sm:gap-6 sm:p-6">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted">
            {t(lang, "cookieText")}{" "}
            <Link href="/privacy" className="underline hover:text-brand-blue dark:hover:text-accent">
              {t(lang, "cookieLink")}
            </Link>
          </p>

          {/* Кнопки равнозначны по весу: отказ не спрятан серым в углу. */}
          <div className="flex flex-none flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => choose(NECESSARY)}
              className="rounded-btn border border-line px-5 py-2.5 text-sm font-semibold text-body transition-colors hover:border-brand-blue/40"
            >
              {t(lang, "cookieNecessary")}
            </button>
            <button
              type="button"
              onClick={() => choose(ALL)}
              className="rounded-btn bg-brand-blue px-5 py-2.5 text-sm font-bold text-white shadow-btn transition-colors hover:bg-brand-dark"
            >
              {t(lang, "cookieAccept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
