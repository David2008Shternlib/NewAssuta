import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Assuta — ведущая частная клиника Израиля",
  description:
    "Диагностика и лечение в клинике Ассута (Тель-Авив): онкология, кардиология, ортопедия, нейрохирургия и более 20 направлений. Ведущие врачи, современные технологии, полное сопровождение.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
