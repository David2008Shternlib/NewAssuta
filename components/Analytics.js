"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { integrations } from "@/data/site";
import { ALL, EVENT, getConsent } from "@/lib/consent";

/**
 * Яндекс.Метрика. Счётчик тот же, что на действующем assuta.org, — домен при
 * переезде не меняется, поэтому для Метрики это один и тот же сайт и история
 * посещаемости не разрывается.
 *
 * Загружается только после согласия на аналитические куки. Пока выбор не
 * сделан или выбрано «только необходимые», скрипта на странице нет вовсе —
 * иначе баннер был бы обманом.
 *
 * Вебвизор выключен намеренно. Он записывает сессию целиком: прокрутку,
 * движение мыши, содержимое страницы и ввод в поля. В форме заявки есть
 * поле комментария, куда люди пишут про диагноз, — запись такого означала бы
 * хранение сведений о здоровье на чужих серверах. На действующем сайте
 * клиента Вебвизор тоже выключен.
 */
export default function Analytics() {
  const id = integrations.yandexMetrikaId;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => setAllowed(getConsent() === ALL);
    read();
    window.addEventListener(EVENT, read);
    return () => window.removeEventListener(EVENT, read);
  }, []);

  if (!id || !allowed) return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
    </Script>
  );
}
