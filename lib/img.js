/**
 * Размер картинок из CMS.
 *
 * Sanity отдаёт файл ровно таким, каким его загрузили. В базе лежат
 * портреты по 1170×1234 и снимки по 1024×1024 — а показываем мы их в
 * кружке 80px и в карточке 320px. Браузер честно качал оригинал: 118 КБ
 * вместо 5 КБ на каждого врача, и на странице со 147 врачами это
 * превращалось в несколько мегабайт на одно открытие.
 *
 * У Sanity есть параметры преобразования прямо в адресе — просим нужный
 * размер и современный формат, остальное CDN делает на своей стороне
 * и кэширует.
 *
 * Чужие адреса (ютубовские обложки, наши файлы из public) возвращаются
 * как есть: параметры Sanity им ничего не говорят.
 */
export function cdnImage(url, width, height, quality = 72) {
  if (typeof url !== "string" || !url.includes("cdn.sanity.io")) return url;
  if (url.includes("?")) return url;

  const p = new URLSearchParams();
  if (width) p.set("w", String(Math.round(width)));
  if (height) p.set("h", String(Math.round(height)));
  if (width && height) p.set("fit", "crop");
  // auto=format отдаёт WebP или AVIF тем браузерам, которые их понимают.
  p.set("auto", "format");
  p.set("q", String(quality));
  return `${url}?${p.toString()}`;
}

/**
 * Запас под экраны с удвоенной плотностью: просим вдвое больше точек,
 * чем занимает место на странице. Портрет 80px на retina выглядит
 * мылом, если прислать ровно 80px.
 */
export const cdnImage2x = (url, width, height, quality = 68) =>
  cdnImage(url, width && width * 2, height && height * 2, quality);
