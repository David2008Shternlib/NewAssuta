import Client from "./ContactsClient";
import { breadcrumb, webPage } from "@/lib/schema";

export const metadata = {
  title: "Контакты — клиника Ассута, Тель-Авив",
  description: "Телефоны, мессенджеры, адрес и карта клиники Ассута в Тель-Авиве. Оставьте заявку — координатор свяжется с вами.",
  alternates: { canonical: "/contacts" },
  openGraph: { title: "Контакты — клиника Ассута, Тель-Авив | Assuta", description: "Телефоны, мессенджеры, адрес и карта клиники Ассута в Тель-Авиве. Оставьте заявку — координатор свяжется с вами.", url: "/contacts" },
};

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Контакты", path: "/contacts" },
]);
const __page = webPage({ name: metadata.title, path: "/contacts", description: metadata.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
