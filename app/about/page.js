import Client from "./AboutClient";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

const ruMeta = {
  title: "О клинике Ассута — медицинский туризм в Израиле",
  description: "Ассута — ведущая частная клиника Израиля. Полное сопровождение иностранных пациентов: подбор врача, диагностика, перевод, трансфер, проживание.",
};
const enMeta = {
  title: "About Assuta Clinic — medical tourism in Israel",
  description: "Assuta is a leading private clinic in Israel. Full support for international patients: choosing a doctor, diagnosis, interpreting, transfers and accommodation.",
};

export function generateMetadata() {
  return pageMeta({ path: "/about", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "О компании", path: "/about" },
]);
const __page = webPage({ name: ruMeta.title, path: "/about", description: ruMeta.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
