import Client from "./DepartmentsClient";
import { breadcrumb, webPage } from "@/lib/schema";

export const metadata = {
  title: "Направления лечения — клиника Ассута",
  description: "Более 20 медицинских направлений в клинике Ассута (Израиль): онкология, кардиология, ортопедия, нейрохирургия, урология и другие.",
  alternates: { canonical: "/departments" },
  openGraph: { title: "Направления лечения — клиника Ассута | Assuta", description: "Более 20 медицинских направлений в клинике Ассута (Израиль): онкология, кардиология, ортопедия, нейрохирургия, урология и другие.", url: "/departments" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Направления лечения", path: "/departments" },
]);
const __page = webPage({ name: metadata.title, path: "/departments", description: metadata.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
