import Client from "./DepartmentsClient";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

const ruMeta = {
  title: "Направления лечения — клиника Ассута",
  description: "Более 20 медицинских направлений в клинике Ассута (Израиль): онкология, кардиология, ортопедия, нейрохирургия, урология и другие.",
};
const enMeta = {
  title: "Areas of treatment — Assuta Clinic",
  description: "More than 20 medical specialities at the Assuta clinic in Israel: oncology, cardiology, orthopaedics, neurosurgery, urology and others.",
};

export function generateMetadata() {
  return pageMeta({ path: "/departments", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Направления лечения", path: "/departments" },
]);
const __page = webPage({ name: ruMeta.title, path: "/departments", description: ruMeta.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
