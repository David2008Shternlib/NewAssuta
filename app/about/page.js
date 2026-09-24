import Client from "./AboutClient";
import { breadcrumb, webPage } from "@/lib/schema";

export const metadata = {
  title: "О клинике Ассута — медицинский туризм в Израиле",
  description: "Ассута — ведущая частная клиника Израиля. Полное сопровождение иностранных пациентов: подбор врача, диагностика, перевод, трансфер, проживание.",
  alternates: { canonical: "/about" },
  openGraph: { title: "О клинике Ассута — медицинский туризм в Израиле | Assuta", description: "Ассута — ведущая частная клиника Израиля. Полное сопровождение иностранных пациентов: подбор врача, диагностика, перевод, трансфер, проживание.", url: "/about" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "О компании", path: "/about" },
]);
const __page = webPage({ name: metadata.title, path: "/about", description: metadata.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
