/**
 * Подсчёт сводки по источникам обращений.
 *
 * Вынесено из страницы отдельно, чтобы логику подсчёта можно было читать
 * и править без вёрстки, а вёрстку — без риска сломать арифметику.
 *
 * Ключевое правило: группируем по ПЕРВОМУ источнику. Если человек пришёл
 * по ссылке блогера, а вернулся через поиск, обращение засчитывается
 * блогеру — он привёл. Возврат показываем отдельной строкой, чтобы
 * координатор понимал путь, но на распределение он не влияет.
 */

// Заявки, полученные до запуска системы, в сводку не попадают: у них
// просто нет полей источника, и они занижали бы долю опознанных.
export const LAUNCHED_AT = "2026-11-03T00:00:00.000Z";

const UNKNOWN = "__unknown__";

/**
 * Как называется источник в отчёте.
 *
 * У клиента имя блогера лежит в utm_content, а в utm_source — площадка.
 * Поэтому для подписи берём сначала utm_content, и только если его нет —
 * utm_source. Схема именования принадлежит клиенту и может измениться;
 * порядок проверки — единственное место, которое тогда придётся поправить.
 */
function sourceKey(lead) {
  const name = (lead.utmContent || lead.utmSource || "").trim();
  if (!name) return UNKNOWN;
  return name;
}

function isPaidPlacement(lead) {
  // Размещение у блогера опознаём по наличию кампании: у органического
  // перехода из поиска её не бывает.
  return Boolean(lead.utmCampaign);
}

export function buildReport(leads = []) {
  const since = new Date(LAUNCHED_AT).getTime();

  const tracked = leads.filter((l) => {
    const t = new Date(l.createdAt || 0).getTime();
    return Number.isFinite(t) && t >= since;
  });

  const groups = new Map();

  for (const lead of tracked) {
    const key = sourceKey(lead);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        name: key === UNKNOWN ? "Источник не определён" : key,
        platform: key === UNKNOWN ? "" : lead.utmSource || "",
        campaign: lead.utmCampaign || "",
        placement: lead.utmMedium || "",
        paid: isPaidPlacement(lead),
        count: 0,
        returned: 0,
        statuses: {},
      });
    }
    const g = groups.get(key);
    g.count += 1;
    if (lead.lastSource) g.returned += 1;
    const st = lead.status || "new";
    g.statuses[st] = (g.statuses[st] || 0) + 1;
  }

  const total = tracked.length;
  const rows = [...groups.values()].sort((a, b) => {
    // Неопознанные всегда внизу — это не источник, а остаток.
    if (a.key === UNKNOWN) return 1;
    if (b.key === UNKNOWN) return -1;
    // Платные размещения выше органики: ради них отчёт и делается.
    if (a.paid !== b.paid) return a.paid ? -1 : 1;
    return b.count - a.count;
  });

  const identified = rows
    .filter((r) => r.key !== UNKNOWN)
    .reduce((sum, r) => sum + r.count, 0);

  const share = (n) => (total ? Math.round((n / total) * 100) : 0);

  return {
    total,
    identified,
    identifiedShare: share(identified),
    fromPlacements: rows.filter((r) => r.paid).reduce((s, r) => s + r.count, 0),
    rows: rows.map((r) => ({ ...r, share: share(r.count) })),
    period: {
      from: tracked.length ? tracked[0].createdAt : LAUNCHED_AT,
      to: tracked.length ? tracked[tracked.length - 1].createdAt : null,
    },
  };
}

/**
 * Доли для кольцевой диаграммы: длина дуги и смещение для каждой части.
 * Считаем здесь, а не в разметке, чтобы в вёрстке не было арифметики.
 */
export function donutSegments(rows, radius = 70) {
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return rows.map((r) => {
    const length = (r.share / 100) * circumference;
    const seg = {
      key: r.key,
      length,
      gap: circumference - length,
      offset: -offset,
    };
    offset += length;
    return seg;
  });
}

export const PALETTE = ["#13306b", "#5aa63c", "#2a5fc9", "#c08a1e", "#8e5bbf", "#1f9a92"];
export const GREY = "#b9c4d4";
