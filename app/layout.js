import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Assuta — ведущая частная клиника Израиля",
  description:
    "Диагностика и лечение в клинике Ассута (Тель-Авив): онкология, кардиология, ортопедия, нейрохирургия и более 20 направлений.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
