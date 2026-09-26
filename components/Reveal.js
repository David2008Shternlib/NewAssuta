"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Наблюдателя может не быть — тогда просто показываем, без анимации.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    let io;
    const show = () => {
      setVisible(true);
      if (io) io.disconnect();
    };

    // Порог именно нулевой — срабатываем, как только блок коснулся экрана.
    //
    // Раньше здесь стояло threshold: 0.15, то есть «показать, когда видно 15%
    // блока». Для блока выше экрана это условие может не выполниться никогда:
    // статья про мидриаз на телефоне занимает 7300 пикселей при экране 812,
    // одновременно видно максимум 11% — порог не достигается, наблюдатель не
    // срабатывает, и текст навсегда остаётся прозрачным. На странице был
    // заголовок и пустота. Ломались все длинные статьи на узких экранах.
    io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);

    // Страховка для блоков выше экрана: они и так не анимируются целиком,
    // а цена незамеченной ошибки здесь — пустая страница вместо статьи.
    let timer;
    if (el.getBoundingClientRect().height > window.innerHeight) {
      timer = setTimeout(show, 3000);
    }

    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
