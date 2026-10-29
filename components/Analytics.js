"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { integrations } from "@/data/site";
import { ALL, EVENT, getConsent } from "@/lib/consent";

/**
 * Счётчики посещаемости: Яндекс.Метрика и Google Analytics 4.
 *
 * Оба идентификатора те же, что на действующем assuta.org, — домен при
 * переезде не меняется, поэтому для обоих сервисов это один и тот же сайт
 * и история посещаемости не разрывается.
 *
 * Загружаются только после согласия на аналитические куки. Пока выбор не
 * сделан или выбрано «только необходимые», ни одного стороннего скрипта на
 * странице нет — иначе баннер был бы обманом.
 *
 * Зачем GA4, когда есть Метрика. Клиент запускает рекламу в Google Ads, а
 * конверсии туда удобнее всего передавать именно через GA4: событие заявки
 * отправляется один раз, а Ads забирает его по связке аккаунтов. Отдельный
 * тег конверсий Ads означал бы второе место, где считаются заявки, и два
 * расходящихся числа вместо одного.
 *
 * Вебвизор в Метрике выключен намеренно. Он записывает сессию целиком:
 * прокрутку, движение мыши, содержимое страницы и ввод в поля. В форме
 * заявки есть поле комментария, куда люди пишут про диагноз, — запись
 * такого означала бы хранение сведений о здоровье на чужих серверах.
 */
export default function Analytics() {
  const { yandexMetrikaId: ym, ga4Id } = integrations;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => setAllowed(getConsent() === ALL);
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);

  if (!allowed) return null;

  return (
    <>
      {ym && (
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ym},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
        </Script>
      )}

      {ga4Id && (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      )}
    </>
  );
}
