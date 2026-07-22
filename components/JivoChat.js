"use client";
import Script from "next/script";
import { integrations } from "@/data/site";

// Подключение JivoChat. Активируется, когда в data/site.js задан integrations.jivoId.
export default function JivoChat() {
  if (!integrations.jivoId) return null;
  return <Script src={`https://code.jivo.ru/widget/${integrations.jivoId}`} strategy="afterInteractive" />;
}
