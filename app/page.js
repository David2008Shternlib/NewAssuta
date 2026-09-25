import HomeClient from "./HomeClient";
import { getAllDoctors, getAllDiseases, getReviews, getAllNews } from "@/lib/sanity";
import { faqPage } from "@/lib/schema";
import { operator } from "@/data/site";

// Блок «вопрос — самодостаточный ответ»: именно такие куски ИИ-ассистенты
// забирают в свои сводки. Аудит отдельно отмечает, что их на сайте не было.
const __faq = faqPage([
  {
    q: "Кто организует лечение в клинике Ассута для русскоязычных пациентов?",
    a: `Организацией занимается ${operator.legalName}${operator.registryNumber ? ` (регистрационный номер ${operator.registryNumber})` : ""} — компания-представитель, а не сама больница. Мы подбираем врача, согласуем программу диагностики и лечения, рассчитываем стоимость, организуем перелёт, проживание, трансфер и перевод. Медицинские услуги оказывает клиника Assuta в Тель-Авиве.`,
  },
  {
    q: "Сколько занимает организация поездки на лечение в Израиль?",
    a: "Обычно от заявки до приезда проходит от нескольких дней до двух недель. Координатор связывается в течение рабочего дня, запрашивает медицинские документы, согласует с врачом программу и называет стоимость. Дальше срок зависит в основном от получения визы и подбора удобных дат.",
  },
  {
    q: "Сколько стоит консультация и диагностика?",
    a: "Консультация врача-специалиста — от 450 долларов, консультация профессора — 550, второе врачебное мнение — 700. УЗИ — 300, КТ одной области — 650, МРТ одной области — 1100, ПЭТ-КТ всего тела — 1900 долларов. Подбор врача и расчёт программы бесплатны.",
  },
  {
    q: "Что такое клиника Ассута?",
    a: "Assuta — крупнейшая сеть частных медицинских центров Израиля, основанная в 1935 году. В её клиниках выполняется значительная часть всех операций в стране. Мы организуем в ней лечение иностранных пациентов и не являемся её структурным подразделением.",
  },
]);

// Страховка на случай, если сигнал из CMS не дошёл: обновление раз в 5 минут.
// Основной путь — вебхук Sanity на /api/revalidate (см. cms/README.md).
export const revalidate = 300;

export default async function Page() {
  const [doctors, diseases, reviews, newsRaw] = await Promise.all([
    getAllDoctors(), getAllDiseases(), getReviews(), getAllNews(),
  ]);

  const map = new Map();
  const diseasesByCategory = [];
  for (const d of diseases) {
    const c = d.category || "Другое";
    if (!map.has(c)) { const arr = []; map.set(c, arr); diseasesByCategory.push({ category: c, items: arr }); }
    map.get(c).push({ slug: d.slug, title: d.title, titleEn: d.titleEn });
  }
  const news = newsRaw.map((n) => ({ slug: n.slug, title: n.title, titleEn: n.titleEn, excerpt: n.excerpt, excerptEn: n.excerptEn, img: n.image }));

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__faq) }} />
    <HomeClient
      doctors={doctors.slice(0, 8)}
      diseasesByCategory={diseasesByCategory.slice(0, 6)}
      reviews={reviews.slice(0, 4)}
      news={news.slice(0, 3)}
    />
    </>
  );
}
