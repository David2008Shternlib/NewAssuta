import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Assuta — ведущая частная клиника Израиля",
  description:
    "Диагностика и лечение в клинике Ассута (Тель-Авив): онкология, кардиология, ортопедия, нейрохирургия и более 20 направлений.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </LangProvider>
      </body>
    </html>
  );
}
