import Client from "./ContactsClient";
import { breadcrumb, webPage } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

const ruMeta = {
  title: "Контакты — клиника Ассута, Тель-Авив",
  description: "Телефоны, мессенджеры, адрес и карта клиники Ассута в Тель-Авиве. Оставьте заявку — координатор свяжется с вами.",
};
const enMeta = {
  title: "Contacts — Assuta Clinic, Tel Aviv",
  description: "Phone numbers, messengers, address and map of the Assuta clinic in Tel Aviv. Leave a request and a coordinator will get in touch.",
};

export function generateMetadata() {
  return pageMeta({ path: "/contacts", ru: ruMeta, en: enMeta });
}

const __crumbs = breadcrumb([
  { name: "Главная", path: "" },
  { name: "Контакты", path: "/contacts" },
]);
const __page = webPage({ name: ruMeta.title, path: "/contacts", description: ruMeta.description });

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__page) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__crumbs) }} />
      <Client />
    </>
  );
}
