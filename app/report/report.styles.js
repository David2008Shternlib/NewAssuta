/**
 * Оформление страницы отчёта.
 *
 * Держим обычной строкой, а не файлом .css: у отчёта собственный облик,
 * не связанный с сайтом, и общие стили ему только мешали бы. Строка
 * вставляется в разметку одним тегом — ни лишнего запроса, ни зависимости
 * от загрузки внешнего файла при печати в PDF.
 *
 * Все имена классов начинаются с rp-, чтобы ничего не пересеклось
 * с оформлением сайта.
 */
const styles = `
.rp-hero{background:linear-gradient(135deg,#13306b 0%,#1c4499 60%,#2a5fc9 100%);
  color:#fff;padding:42px 0 102px;border-radius:0 0 22px 22px}
.rp-wrap{max-width:940px;margin:0 auto;padding:0 28px}
.rp-body{padding-bottom:72px;color:#1b2330;
  font:16px/1.6 -apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.rp-eyebrow{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#a9ffb0;font-weight:700}
.rp-hero h1{font-size:36px;line-height:1.12;margin:12px 0 10px;letter-spacing:-.025em;font-weight:800;color:#fff}
.rp-hero p{margin:0;font-size:16px;color:#cfe0ff;max-width:640px}
.rp-when{margin-top:20px;font-size:13px;color:#9fbdf5}
/* Запас снизу у шапки рассчитан под заход карточек: 102px отступа
   против 56px подъёма даёт 46px чистого поля под строкой с датой. */

.rp-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:-56px 0 34px}
.rp-card{background:#fff;border-radius:14px;padding:20px 16px;text-align:center;
  box-shadow:0 6px 22px rgba(19,48,107,.10)}
.rp-card .v{font-size:34px;font-weight:800;color:#13306b;line-height:1}
.rp-card .v small{font-size:19px;font-weight:700}
.rp-card .l{font-size:12.5px;color:#64748b;margin-top:8px;line-height:1.35}

.rp-body h2{font-size:22px;color:#13306b;margin:38px 0 4px;letter-spacing:-.015em}
.rp-sub{color:#64748b;font-size:14.5px;margin:0 0 16px}

.rp-chart{display:grid;grid-template-columns:260px 1fr;gap:34px;align-items:center;
  background:#fff;border-radius:16px;padding:26px 30px;box-shadow:0 2px 12px rgba(19,48,107,.06)}
.rp-legend{list-style:none;margin:0;padding:0}
.rp-legend li{display:flex;align-items:flex-start;gap:12px;padding:13px 0;border-bottom:1px solid #e2e9f3}
.rp-legend li:last-child{border-bottom:0}
.rp-legend .dot{width:13px;height:13px;border-radius:4px;margin-top:5px;flex:none}
.rp-legend .nm{display:block;font-weight:700;color:#1b2330}
.rp-legend .ds{display:block;font-size:13.5px;color:#64748b}
.rp-legend .pc{margin-left:auto;font-size:22px;font-weight:800;color:#13306b;white-space:nowrap}

.rp-table{width:100%;border-collapse:collapse;margin:14px 0;background:#fff;
  border-radius:14px;overflow:hidden;font-size:15px;box-shadow:0 2px 12px rgba(19,48,107,.06)}
.rp-table th{background:#f4f8fd;text-align:left;padding:13px 16px;font-size:12px;
  text-transform:uppercase;letter-spacing:.07em;color:#64748b}
.rp-table td{padding:14px 16px;border-top:1px solid #e2e9f3;vertical-align:top}
.rp-table td.n,.rp-table th.n{text-align:right;white-space:nowrap}
.rp-table .big{font-weight:800;color:#13306b}
.rp-table tr.total{background:#f7fafe}

.rp-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}
.rp-step{background:#fff;border-radius:14px;padding:18px 16px;box-shadow:0 2px 12px rgba(19,48,107,.06)}
.rp-step .n{width:26px;height:26px;border-radius:50%;background:#13306b;color:#fff;font-size:13px;
  font-weight:700;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
.rp-step b{display:block;font-size:14.5px;color:#1c4499;margin-bottom:4px}
.rp-step span{font-size:13px;color:#64748b;line-height:1.45}

.rp-value{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:16px 0}
.rp-vcard{background:#fff;border-radius:14px;padding:22px 20px;border-top:3px solid #5aa63c;
  box-shadow:0 2px 12px rgba(19,48,107,.06)}
.rp-vcard b{display:block;color:#13306b;font-size:15.5px;margin-bottom:6px}
.rp-vcard span{font-size:13.5px;color:#64748b;line-height:1.5}

.rp-empty{background:#fff;border-radius:14px;padding:30px;text-align:center;color:#64748b;
  box-shadow:0 2px 12px rgba(19,48,107,.06)}
.rp-note{background:#fdf9ef;border-left:3px solid #c08a1e;border-radius:0 10px 10px 0;
  padding:14px 18px;margin:22px 0;font-size:14px;color:#5a4a28}
.rp-footer{margin-top:40px;padding-top:16px;border-top:1px solid #e2e9f3;font-size:12.5px;color:#64748b}

@media (max-width:760px){
  .rp-cards,.rp-flow,.rp-value{grid-template-columns:1fr 1fr}
  .rp-chart{grid-template-columns:1fr;justify-items:center;text-align:left}
  .rp-hero h1{font-size:27px}
}
@media print{
  .rp-hero{border-radius:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .rp-card,.rp-chart,.rp-table,.rp-step,.rp-vcard{box-shadow:none;border:1px solid #e2e9f3}
  .rp-body h2{break-after:avoid}
  .rp-table,.rp-chart,.rp-value{break-inside:avoid}
}
`;

export default styles;
