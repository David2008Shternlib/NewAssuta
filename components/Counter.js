"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ value, className = "" }) {
  const str = String(value);
  const m = str.match(/(\d[\d\s]*)/);
  const target = m ? parseInt(m[1].replace(/\s/g, ""), 10) : 0;
  const prefix = m ? str.slice(0, m.index) : "";
  const suffix = m ? str.slice(m.index + m[1].length) : str;
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1400, t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref} className={className}>{prefix}{n}{suffix}</span>;
}
