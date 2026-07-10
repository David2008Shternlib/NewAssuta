import PageHero from "@/components/PageHero";
import DoctorCard from "@/components/DoctorCard";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { doctors } from "@/data/site";

export const metadata = { title: "Врачи клиники Ассута — ведущие специалисты Израиля" };

export default function DoctorsPage() {
  return (
    <>
      <PageHero title="Наши врачи" crumb="Врачи" subtitle="Более 3000 узкопрофильных специалистов: профессора и врачи высшей категории с мировым именем." />
      <section className="py-16">
        <div className="wrap grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {doctors.map((doc, i) => (
            <Reveal key={doc.slug} delay={(i % 4) * 0.05}>
              <DoctorCard doc={doc} />
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
