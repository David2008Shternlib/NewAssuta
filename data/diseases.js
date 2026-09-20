import { diseasesByCategory, doctors } from "./site";
import { pick } from "./i18n";

export const allDiseases = diseasesByCategory.flatMap((c) =>
  c.items.map((it) => ({ ...it, category: c.category }))
);

export function findDisease(slug) {
  return allDiseases.find((d) => d.slug === slug) || null;
}

// Соответствие категории и slug отделения
const categoryToDept = {
  "Онкология": "oncology",
  "Кардиология": "cardiology",
  "Ортопедия": "orthopedic",
  "Неврология и нейрохирургия": "neurosurgery",
  "Гастроэнтерология": "gastroenterology",
  "Урология": "urology",
};

export function doctorsForCategory(category) {
  const dept = categoryToDept[category?.ru];
  const list = doctors.filter((d) => d.dept === dept);
  return list.length ? list : doctors.slice(0, 3);
}

export function diseaseContent(d, lang) {
  const title = pick(d.title, lang);
  if (lang === "en") {
    return {
      intro: `Treatment of ${title.toLowerCase()} at Assuta clinic follows modern international protocols. Comprehensive diagnostics, a personalized plan and management by an experienced multidisciplinary team deliver strong results and shorter hospital stays.`,
      blocks: [
        { h: "Diagnostics", p: `Examination for ${title.toLowerCase()} takes 2–4 working days and includes consultations with specialists, lab tests and imaging on expert-class equipment (MRI, CT, PET-CT, ultrasound). Accurate diagnosis is the basis of a correct treatment plan.` },
        { h: "Treatment methods", p: `An optimal approach is chosen for each patient: minimally invasive and robotic surgery, modern drug therapy, radiation and targeted methods. The decision is made by a medical board based on the examination results.` },
        { h: "Why Assuta", p: `Private-clinic status means speed: diagnostics and treatment start without queues, a flexible procedure schedule, leading professors and the newest equipment. The international department handles everything from airport pickup to discharge.` },
      ],
    };
  }
  return {
    intro: `Лечение по направлению «${title}» в клинике Ассута проводится по современным международным протоколам. Комплексная диагностика, персональный план и ведение пациента опытной мультидисциплинарной командой позволяют добиваться высоких результатов и сокращать сроки госпитализации.`,
    blocks: [
      { h: "Диагностика", p: `Обследование при направлении «${title}» занимает 2–4 рабочих дня и включает консультации профильных специалистов, лабораторные анализы и визуализацию на оборудовании экспертного класса (МРТ, КТ, ПЭТ-КТ, УЗИ). Точная диагностика — основа корректного плана лечения.` },
      { h: "Методы лечения", p: `Для каждого пациента подбирается оптимальная тактика: малоинвазивная и роботизированная хирургия, современная лекарственная терапия, лучевые и таргетные методики. Решение принимается консилиумом врачей на основании результатов обследования.` },
      { h: "Почему Ассута", p: `Статус частной клиники обеспечивает скорость: диагностика и начало лечения без очередей, гибкий график процедур, ведущие профессора и новейшее оборудование. Всё сопровождение — от встречи в аэропорту до выписки — берёт на себя международный отдел.` },
    ],
  };
}

export function doctorBio(doc, lang) {
  const name = pick(doc.name, lang);
  const spec = pick(doc.spec, lang);
  if (lang === "en") {
    return `${name} is a leading Israeli specialist in ${spec.toLowerCase()} at Assuta clinic. With many years of clinical experience, they regularly apply the newest diagnostic and treatment methods and take part in international research. They guide patients through every stage — from consultation and diagnosis to surgery and follow-up.`;
  }
  return `${name} — ведущий израильский специалист по направлению «${spec}» в клинике Ассута. Обладает многолетним опытом клинической практики, регулярно применяет новейшие методики диагностики и лечения, участвует в международных исследованиях. Ведёт пациентов на всех этапах — от консультации и постановки диагноза до операции и последующего наблюдения.`;
}

export const expertiseList = {
  ru: ["Консультация и постановка диагноза", "Малоинвазивные и роботизированные операции", "Ведение пациента на всех этапах лечения", "Второе врачебное мнение"],
  en: ["Consultation and diagnosis", "Minimally invasive and robotic surgery", "Patient management at every stage", "Second medical opinion"],
};
