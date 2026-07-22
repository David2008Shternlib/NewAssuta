import Client from "./DoctorsClient";

export const metadata = {
  title: "Врачи клиники Ассута — ведущие специалисты Израиля",
  description: "Профильные врачи клиники Ассута в Израиле: онкологи, кардиологи, ортопеды, нейрохирурги и другие. Запись на консультацию и лечение.",
  alternates: { canonical: "/doctors" },
  openGraph: { title: "Врачи клиники Ассута — ведущие специалисты Израиля | Assuta", description: "Профильные врачи клиники Ассута в Израиле: онкологи, кардиологи, ортопеды, нейрохирурги и другие. Запись на консультацию и лечение.", url: "/doctors" },
};

export default function Page() {
  return <Client />;
}
