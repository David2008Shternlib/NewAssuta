"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { operator, site } from "@/data/site";
import { pick, t } from "@/data/i18n";
import { useLang } from "@/components/LangProvider";

const UPDATED = "2026-09-22";

const ru = (op) => [
  {
    h: "1. Кто обрабатывает ваши данные",
    p: [
      `Оператором персональных данных является ${op.legalName}${op.registryNumber ? `, регистрационный номер ${op.registryNumber}` : ""} (далее — «мы», «Компания»).`,
      op.office.ru ? `Адрес офиса: ${op.office.ru}.` : null,
      op.email ? `Электронная почта для обращений по вопросам персональных данных: ${op.email}.` : "Контакты для обращений по вопросам персональных данных указаны в разделе «Контакты».",
      "Мы организуем лечение и сопровождение пациентов в клинике Assuta и не являемся медицинским учреждением.",
    ].filter(Boolean),
  },
  {
    h: "2. Какие данные мы собираем",
    p: [
      "Через формы на сайте мы получаем только те данные, которые вы указываете сами: имя, номер телефона, страну и текст комментария, если вы его оставили.",
      "Мы не просим и не собираем через сайт медицинские документы, диагнозы, результаты обследований и иные сведения о состоянии здоровья. Если такие сведения потребуются для подбора программы лечения, координатор запросит их отдельно и объяснит, как они будут использованы.",
      "Дополнительно автоматически сохраняется адрес страницы, с которой отправлена заявка, — это нужно, чтобы координатор понимал контекст обращения.",
    ],
  },
  {
    h: "3. Зачем мы обрабатываем данные",
    p: [
      "Единственная цель — связаться с вами по вашему обращению: ответить на вопрос, подобрать врача и программу, рассчитать стоимость и организовать поездку.",
      "Основание обработки — ваше согласие, которое вы даёте, отмечая соответствующий пункт при отправке формы.",
      "Мы не используем ваши данные для рассылок, не показываем на их основе рекламу и не принимаем автоматических решений, влияющих на вас.",
    ],
  },
  {
    h: "4. Кому мы передаём данные",
    p: [
      "Мы не продаём и не передаём ваши данные третьим лицам для их собственных целей.",
      "Передача возможна только в объёме, необходимом для организации лечения: медицинскому учреждению и лечащему врачу, а также поставщикам услуг, которые обеспечивают работу сайта и приём обращений. Такие поставщики действуют по нашему поручению и не вправе использовать данные иначе.",
      "Данные могут быть переданы в другую страну, поскольку лечение организуется в Израиле.",
    ],
  },
  {
    h: "5. Сколько мы храним данные",
    p: [
      "Обращения хранятся не дольше, чем это нужно для работы с ними: до трёх лет с момента последнего контакта с вами, если более длительный срок не требуется по закону.",
      "После истечения срока данные удаляются или обезличиваются.",
    ],
  },
  {
    h: "6. Ваши права",
    p: [
      "Вы вправе отозвать согласие в любой момент, запросить копию своих данных, потребовать их исправления или удаления, а также ограничить обработку.",
      "Для этого достаточно написать нам или позвонить по любому из указанных на сайте контактов. Мы ответим в разумный срок, как правило в течение 30 дней.",
      "Отзыв согласия не влияет на законность обработки, которая происходила до отзыва.",
    ],
  },
  {
    h: "7. Как мы защищаем данные",
    p: [
      "Сайт работает по защищённому протоколу HTTPS. Доступ к обращениям имеют только сотрудники, которым он нужен для работы.",
      "Формы защищены от автоматических рассылок; количество обращений с одного адреса ограничено.",
    ],
  },
  {
    h: "8. Файлы cookie и статистика",
    p: [
      "Сайт сохраняет в браузере выбранную вами тему оформления — это нужно только для отображения и не позволяет вас идентифицировать.",
      "Если на сайте подключены сервисы веб-аналитики, они собирают обезличенную статистику посещений. Вы можете запретить это в настройках браузера.",
    ],
  },
  {
    h: "9. Изменения политики",
    p: [
      "Мы можем обновлять эту политику. Актуальная редакция всегда доступна на этой странице, дата последнего обновления указана ниже.",
    ],
  },
];

const en = (op) => [
  {
    h: "1. Who processes your data",
    p: [
      `The data controller is ${op.legalName}${op.registryNumber ? `, company registration number ${op.registryNumber}` : ""} (“we”, “the Company”).`,
      op.office.en ? `Office address: ${op.office.en}.` : null,
      op.email ? `Email for data protection enquiries: ${op.email}.` : "Contact details for data protection enquiries are listed on the Contacts page.",
      "We organise treatment and patient support at Assuta clinic and are not a medical institution.",
    ].filter(Boolean),
  },
  {
    h: "2. What data we collect",
    p: [
      "Through the forms on this site we receive only what you enter yourself: your name, phone number, country and an optional comment.",
      "We do not request or collect medical records, diagnoses or any health information through this website. If such information is needed to plan treatment, a coordinator will request it separately and explain how it will be used.",
      "We also record the address of the page the request was sent from, so the coordinator understands the context.",
    ],
  },
  {
    h: "3. Why we process it",
    p: [
      "The only purpose is to contact you about your enquiry: to answer your question, suggest a doctor and a programme, estimate the cost and arrange the trip.",
      "The legal basis is your consent, given by ticking the box when you submit the form.",
      "We do not use your data for marketing mailings, do not target advertising with it and make no automated decisions affecting you.",
    ],
  },
  {
    h: "4. Who we share it with",
    p: [
      "We do not sell your data and do not share it with third parties for their own purposes.",
      "Sharing happens only as far as necessary to arrange treatment: with the medical institution and the treating physician, and with service providers who keep the website and enquiry handling running. Such providers act on our instructions only.",
      "Data may be transferred to another country, as treatment is arranged in Israel.",
    ],
  },
  {
    h: "5. How long we keep it",
    p: [
      "Enquiries are kept no longer than needed: up to three years from our last contact with you, unless a longer period is required by law.",
      "After that the data is deleted or anonymised.",
    ],
  },
  {
    h: "6. Your rights",
    p: [
      "You may withdraw consent at any time, request a copy of your data, ask us to correct or delete it, or restrict processing.",
      "Simply write or call us using any contact listed on the site. We reply within a reasonable time, normally within 30 days.",
      "Withdrawing consent does not affect the lawfulness of processing carried out before the withdrawal.",
    ],
  },
  {
    h: "7. How we protect it",
    p: [
      "The site runs over HTTPS. Access to enquiries is limited to staff who need it for their work.",
      "Forms are protected against automated submissions and the number of requests from one address is limited.",
    ],
  },
  {
    h: "8. Cookies and analytics",
    p: [
      "The site stores your chosen colour theme in the browser. This is used for display only and does not identify you.",
      "If web analytics services are enabled, they collect anonymised visit statistics. You can disable this in your browser settings.",
    ],
  },
  {
    h: "9. Changes to this policy",
    p: ["We may update this policy. The current version is always available on this page, with the date of the last update shown below."],
  },
];

export default function PrivacyClient() {
  const { lang } = useLang();
  const sections = lang === "en" ? en(operator) : ru(operator);
  const updated = new Date(UPDATED).toLocaleDateString(lang === "en" ? "en-GB" : "ru-RU", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <PageHero
        title={t(lang, "privacyTitle")}
        subtitle={lang === "en"
          ? "How we handle the data you send through this website."
          : "Как мы обращаемся с данными, которые вы отправляете через этот сайт."}
      />

      <section className="py-14">
        <div className="wrap max-w-3xl">
          <Reveal>
            <p className="mb-8 rounded-xl2 bg-surface2 p-5 text-sm leading-relaxed text-muted">
              {lang === "en"
                ? "In short: we use your name and phone number only to get back to you about your enquiry. We do not sell your data and do not send marketing mailings. You can ask us to delete your data at any time."
                : "Коротко: имя и телефон нужны нам только для того, чтобы ответить на ваше обращение. Мы не продаём ваши данные и не рассылаем рекламу. Вы можете в любой момент попросить нас удалить ваши данные."}
            </p>
          </Reveal>

          <div className="space-y-8">
            {sections.map((s) => (
              <Reveal key={s.h}>
                <div>
                  <h2 className="mb-3 text-xl font-bold text-title">{s.h}</h2>
                  <div className="space-y-3 leading-relaxed text-body/85">
                    {s.p.map((text, i) => <p key={i}>{text}</p>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 border-t border-line pt-6 text-sm text-muted">
              <p>{lang === "en" ? "Last updated: " : "Последнее обновление: "}{updated}</p>
              <p className="mt-2">
                {lang === "en" ? "Questions about your data: " : "Вопросы по вашим данным: "}
                {site.phones.map((p, i) => (
                  <span key={p.value}>
                    {i > 0 && ", "}
                    <a href={p.href} className="underline hover:text-brand-blue dark:hover:text-accent">{p.value}</a>
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
