import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import JivoChat from "@/components/JivoChat";
import Analytics from "@/components/Analytics";
import { site, siteUrl } from "@/data/site";

const DESC =
  "Диагностика и лечение в клинике Ассута (Тель-Авив): онкология, кардиология, ортопедия, нейрохирургия и более 20 направлений. Ведущие врачи, современные технологии, полное сопровождение.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Лечение в Израиле — клиника Ассута: врачи, цены, диагностика",
    template: "%s | Assuta",
  },
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Assuta",
    url: siteUrl,
    title: "Лечение в Израиле — клиника Ассута",
    description: DESC,
    locale: "ru_RU",
    images: [{ url: site.logo, width: 512, height: 512, alt: "Assuta" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Лечение в Израиле — клиника Ассута",
    description: DESC,
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Assuta",
  alternateName: "Клиника Ассута",
  url: siteUrl,
  logo: site.logo,
  telephone: "+972747020202",
  foundingDate: "1935",
  address: {
    "@type": "PostalAddress",
    streetAddress: "HaBarzel St. 11",
    addressLocality: "Tel Aviv",
    addressRegion: "Ramat HaHayal",
    addressCountry: "IL",
  },
  medicalSpecialty: ["Oncologic", "Cardiovascular", "Orthopedic", "Neurologic", "Urologic", "Gynecologic"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </head>
      <body>
        <LangProvider>
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
