import Client from "./ContactsClient";

export const metadata = {
  title: "Контакты — клиника Ассута, Тель-Авив",
  description: "Телефоны, мессенджеры, адрес и карта клиники Ассута в Тель-Авиве. Оставьте заявку — координатор свяжется с вами.",
  alternates: { canonical: "/contacts" },
  openGraph: { title: "Контакты — клиника Ассута, Тель-Авив | Assuta", description: "Телефоны, мессенджеры, адрес и карта клиники Ассута в Тель-Авиве. Оставьте заявку — координатор свяжется с вами.", url: "/contacts" },
};

export default function Page() {
  return <Client />;
}
