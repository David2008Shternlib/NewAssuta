import "./globals.css";
import { headers } from "next/headers";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import JivoChat from "@/components/JivoChat";
import Analytics from "@/components/Analytics";
import { site, siteUrl, operator } from "@/data/site";

const DESC =
  "Организуем диагностику и лечение в клинике Ассута (Тель-Авив): онкология, кардиология, ортопедия, нейрохирургия. Подбор врача, расчёт стоимости, сопровождение.";
const DESC_EN =
  "We arrange diagnosis and treatment at the Assuta clinic in Tel Aviv: oncology, cardiology, orthopaedics, neurosurgery. Choosing a doctor, costing the programme, support throughout.";

const TITLE = "Лечение в Израиле — клиника Ассута: врачи, цены, диагностика";
const TITLE_EN = "Treatment in Israel — Assuta Clinic: doctors, prices, diagnostics";

// Заголовок и описание зависят от языка запроса, поэтому собираются на каждый
// запрос, а не лежат статической константой: иначе на /en/* во вкладке
// браузера и в превью ссылки оставался русский текст.
export function generateMetadata() {
  const en = headers().get("x-locale") === "en";
  const title = en ? TITLE_EN : TITLE;
  const description = en ? DESC_EN : DESC;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s | Assuta" },
    description,
    // hreflang намеренно не указываем: английская версия закрыта от индексации
    // (X-Robots-Tag в middleware). Вернуть languages { ru, en, x-default },
    // когда её решат открыть поисковикам.
    alternates: { canonical: "/" },
    openGraph: {
      type: "website", siteName: "Assuta", url: siteUrl,
      title, description, locale: en ? "en_US" : "ru_RU",
      images: [{ url: site.logo, width: 512, height: 512, alt: "Assuta" }],
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

// Организация — это ОПЕРАТОР, а не больница. Раньше разметка описывала
// саму Ассуту, из-за чего сайт машинно представлялся больницей.
// Больница указана отдельно, как партнёр.
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: operator.legalName,
  alternateName: operator.displayName.ru,
  legalName: operator.legalName,
  url: siteUrl,
  logo: `${siteUrl}${site.logo}`,
  description: operator.role.ru,
  foundingDate: operator.registeredSince || undefined,
  identifier: operator.registryNumber
    ? { "@type": "PropertyValue", name: "Israel company registry", value: operator.registryNumber }
    : undefined,
  address: operator.office.ru
    ? { "@type": "PostalAddress", streetAddress: operator.office.ru, addressCountry: "IL" }
    : undefined,
  email: operator.email || undefined,
  telephone: site.phones.map((p) => p.value),
  memberOf: (operator.memberships || []).map((m) => ({ "@type": "Organization", name: m })),
  areaServed: ["RU", "UA", "KZ", "IL", "DE"],
  knowsLanguage: ["ru", "en", "he"],
};

// Больница, лечение в которой мы организуем — отдельная сущность
const hospitalSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "@id": `${siteUrl}/#hospital`,
  name: "Assuta Medical Centers",
  foundingDate: "1935",
  address: { "@type": "PostalAddress", streetAddress: "HaBarzel St. 11", addressLocality: "Tel Aviv", addressRegion: "Ramat HaHayal", addressCountry: "IL" },
  medicalSpecialty: ["Oncologic", "Cardiovascular", "Orthopedic", "Neurologic", "Urologic", "Gynecologic"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: operator.displayName.ru,
  inLanguage: "ru-RU",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({ children }) {
  const locale = headers().get("x-locale") === "en" ? "en" : "ru";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hospitalSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body>
        <LangProvider initialLang={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <JivoChat />
          <Analytics />
        </LangProvider>
      </body>
    </html>
  );
}
