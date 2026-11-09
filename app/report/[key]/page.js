import { notFound } from "next/navigation";
import { getLeadStats } from "@/lib/sanity";
import { buildReport, donutSegments, PALETTE, GREY } from "../reportData";
import styles from "../report.styles";
import { reportKey } from "../access";

/**
 * Отчёт по источникам обращений для заказчика.
 *
 * Живая страница, а не выгруженный файл: цифры пересчитываются из базы
 * заявок при каждом открытии. Ссылку можно отправить один раз, и она
 * всегда будет показывать текущее состояние.
 *
 * Доступ — по секретному хвосту в адресе, см. ../access.js. Неверный
 * ключ отдаёт «не найдено». В middleware.js страница дополнительно
 * закрывается от поисковых систем и от промежуточных кэшей.
 *
 * Персональных данных пациентов на странице нет: запрос к базе берёт
 * только источники и статусы, без имён, телефонов и комментариев.
 */
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Источники обращений — Ассута",
  robots: { index: false, follow: false },
};

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
    : "—";

export default async function ReportPage({ params }) {
  // Адрес с неверным ключом ведёт себя как несуществующий: по ответу
  // сервера нельзя понять, что страница вообще есть.
  if (params?.key !== reportKey()) notFound();

  let leads = [];
  let failed = false;
  try {
    leads = await getLeadStats();
  } catch {
    failed = true;
  }

  const data = buildReport(leads);
  const segments = donutSegments(data.rows);
  const colorOf = (row, i) => (row.key === "__unknown__" ? GREY : PALETTE[i % PALETTE.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="rp-hero">
        <div className="rp-wrap">
          <div className="rp-eyebrow">Клиника Ассута · {fmtDate(new Date().toISOString())}</div>
          <h1>Теперь видно, кто приводит пациентов</h1>
          <p>
            Каждое обращение с сайта автоматически связывается с источником: блогером,
            рекламной кампанией или поисковой системой. Связь сохраняется до момента
            приезда пациента.
          </p>
          <div className="rp-when">
            Система запущена {fmtDate(data.period.from)} · данные обновляются при каждом открытии страницы
          </div>
        </div>
      </div>

      <div className="rp-wrap rp-body">
        {failed && (
          <div className="rp-note">
            <b>Данные временно недоступны.</b> Не удалось получить сводку из базы обращений.
            Обновите страницу через несколько минут.
          </div>
        )}

        <div className="rp-cards">
          <div className="rp-card">
            <div className="v">{data.identifiedShare}<small>%</small></div>
            <div className="l">обращений<br />с известным источником</div>
          </div>
          <div className="rp-card">
            <div className="v">{data.total}</div>
            <div className="l">обращений<br />с момента запуска</div>
          </div>
          <div className="rp-card">
            <div className="v">{data.fromPlacements}</div>
            <div className="l">пришли<br />с размещений у блогеров</div>
          </div>
          <div className="rp-card">
            <div className="v">90</div>
            <div className="l">дней хранится<br />источник перехода</div>
          </div>
        </div>

        <h2>Откуда пришли обращения</h2>
        <p className="rp-sub">Распределение по первому источнику перехода</p>

        {data.total === 0 ? (
          <div className="rp-empty">
            Обращений с момента запуска системы пока нет. Как только придёт первое,
            оно появится здесь автоматически.
          </div>
        ) : (
          <div className="rp-chart">
            <svg viewBox="0 0 200 200" width="230" height="230" role="img" aria-label="Диаграмма источников">
              <g transform="rotate(-90 100 100)" fill="none" strokeWidth="34">
                {data.rows.map((row, i) => (
                  <circle
                    key={row.key}
                    cx="100" cy="100" r="70"
                    stroke={colorOf(row, i)}
                    strokeDasharray={`${segments[i].length} ${segments[i].gap}`}
                    strokeDashoffset={segments[i].offset}
                  />
                ))}
              </g>
              <text x="100" y="94" textAnchor="middle" fontSize="36" fontWeight="800" fill="#13306b">
                {data.total}
              </text>
              <text x="100" y="116" textAnchor="middle" fontSize="13" fill="#64748b">
                {data.total === 1 ? "обращение" : data.total < 5 ? "обращения" : "обращений"}
              </text>
            </svg>

            <ul className="rp-legend">
              {data.rows.map((row, i) => (
                <li key={row.key}>
                  <span className="dot" style={{ background: colorOf(row, i) }} />
                  <span>
                    <span className="nm">{row.name}</span>
                    <span className="ds">
                      {row.platform && <>{row.platform}</>}
                      {row.campaign && <> · кампания «{row.campaign}»</>}
                      {!row.platform && !row.campaign && <>прямой заход или потерянная метка</>}
                    </span>
                  </span>
                  <span className="pc">{row.share}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.total > 0 && (
          <>
            <h2>Сводка по источникам</h2>
            <p className="rp-sub">Заполняется автоматически, без ручного ввода</p>

            <table className="rp-table">
              <thead>
                <tr>
                  <th>Источник</th>
                  <th>Площадка</th>
                  <th>Кампания</th>
                  <th className="n">Обращений</th>
                  <th className="n">Доля</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row) => (
                  <tr key={row.key}>
                    <td className="big">{row.name}</td>
                    <td>{row.platform || "—"}</td>
                    <td>{row.campaign || "—"}</td>
                    <td className="n big">{row.count}</td>
                    <td className="n">{row.share}%</td>
                  </tr>
                ))}
                <tr className="total">
                  <td colSpan={3}><b>Всего</b></td>
                  <td className="n big">{data.total}</td>
                  <td className="n big">100%</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <h2>Путь обращения</h2>
        <p className="rp-sub">Источник сохраняется на всех шагах, даже если человек вернулся через неделю</p>

        <div className="rp-flow">
          {[
            ["Переход по ссылке", "Блогер публикует персональную ссылку клиники"],
            ["Изучение сайта", "Врачи, цены, заболевания — источник уже записан"],
            ["Заявка", "К имени и телефону добавляется источник перехода"],
            ["Работа координатора", "Статусы вплоть до отметки «Приехал на лечение»"],
          ].map(([title, text], i) => (
            <div className="rp-step" key={title}>
              <div className="n">{i + 1}</div>
              <b>{title}</b>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <h2>Что это даёт клинике</h2>
        <p className="rp-sub">Три решения, которые раньше принимались вслепую</p>

        <div className="rp-value">
          <div className="rp-vcard">
            <b>Платить за результат</b>
            <span>
              Видно не только количество обращений от блогера, но и сколько из них дошло
              до консультации и приезда. Лидер по заявкам и лидер по пациентам — часто разные люди.
            </span>
          </div>
          <div className="rp-vcard">
            <b>Продлевать с теми, кто работает</b>
            <span>
              Стоимость обращения и стоимость пациента считаются по каждому размещению
              отдельно. Решение о продлении опирается на числа.
            </span>
          </div>
          <div className="rp-vcard">
            <b>Не терять мессенджеры</b>
            <span>
              Обращения через WhatsApp тоже помечаются кодом источника — раньше этот канал
              выпадал из учёта полностью.
            </span>
          </div>
        </div>

        <div className="rp-note">
          <b>О выборке.</b> Система работает с {fmtDate(data.period.from)}, получено{" "}
          {data.total === 1 ? "1 обращение" : `${data.total} обращений`}. Цифры показывают
          работоспособность системы; содержательная картина по каналам сложится за
          месяц-полтора регулярных размещений.
        </div>

        <footer className="rp-footer">
          Источник данных: база обращений сайта assuta.org. Страница закрыта паролем
          и от поисковых систем. Персональные данные пациентов на ней не отображаются.
        </footer>
      </div>
    </>
  );
}
