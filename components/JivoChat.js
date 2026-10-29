"use client";
import { useEffect } from "react";
import Script from "next/script";
import { integrations } from "@/data/site";
import { readAttribution } from "@/lib/utm";

/**
 * Онлайн-чат JivoChat — тот же виджет, что работает на assuta.org.
 *
 * Включается, когда в data/site.js задан integrations.jivoId. Пока он пуст,
 * вместо чата показывается наша заглушка (components/ChatWidget.js), которая
 * сама прячется, как только настоящий чат включён.
 *
 * Грузим стратегией lazyOnload, то есть после полной загрузки страницы.
 * Виджет весит несколько сотен килобайт и тянет свои шрифты и соединения;
 * при afterInteractive он конкурирует за канал с первым экраном и ухудшает
 * скорость показа главной. Человек всё равно открывает чат не в первую
 * секунду, а задержка в пару секунд на появление кнопки незаметна.
 *
 * Домены Jivo (code.jivo.ru и *.jivosite.com) прописаны в политике
 * безопасности в next.config.mjs — без этого браузер молча заблокирует
 * загрузку, не показав ошибки на странице.
 */
export default function JivoChat() {
  // Источник перехода передаём оператору: в карточке посетителя он увидит,
  // от какого блогера человек пришёл, и сможет вести разговор предметно.
  // Колбэк должен быть объявлен ДО загрузки виджета, поэтому ставим его
  // в эффекте — он отрабатывает раньше, чем приедет скрипт.
  useEffect(() => {
    if (!integrations.jivoId || typeof window === "undefined") return;

    window.jivo_onLoadCallback = function () {
      try {
        const a = readAttribution();
        const rows = [
          ["Источник", a.utmSource],
          ["Канал", a.utmMedium],
          ["Кампания", a.utmCampaign],
          ["Переход с сайта", a.referrer],
          ["Первая страница", a.landing],
        ]
          .filter(([, content]) => content)
          .map(([title, content]) => ({ title, content }));

        if (rows.length && window.jivo_api && typeof window.jivo_api.setCustomData === "function") {
          window.jivo_api.setCustomData(rows);
        }
      } catch {
        /* чат важнее метки: если что-то пошло не так, переписка работает */
      }
    };
  }, []);

  if (!integrations.jivoId) return null;

  return (
    <Script
      src={`https://code.jivo.ru/widget/${integrations.jivoId}`}
      strategy="lazyOnload"
    />
  );
}
