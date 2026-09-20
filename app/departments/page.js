import Client from "./DepartmentsClient";

export const metadata = {
  title: "Направления лечения — клиника Ассута",
  description: "Более 20 медицинских направлений в клинике Ассута (Израиль): онкология, кардиология, ортопедия, нейрохирургия, урология и другие.",
  alternates: { canonical: "/departments" },
  openGraph: { title: "Направления лечения — клиника Ассута | Assuta", description: "Более 20 медицинских направлений в клинике Ассута (Израиль): онкология, кардиология, ортопедия, нейрохирургия, урология и другие.", url: "/departments" },
};

export default function Page() {
  return <Client />;
}
