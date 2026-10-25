import { NextResponse } from "next/server";
import { getPartner } from "@/lib/sanity";
import { siteUrl } from "@/data/site";

/**
 * Короткие ссылки для блогеров: assuta.org/go/masha
 *
 * Зачем не давать блогеру сразу длинный адрес с метками. Во-первых, хвост
 * вида ?utm_source=masha&utm_medium=blogger&utm_campaign=october в шапке
 * профиля выглядит мусором, и его охотно обрезают. Во-вторых, если клиент
 * захочет поменять кампанию, при коротком адресе правка делается у нас,
 * а блогеру ничего перевыпускать не надо — ссылка в его профиле та же.
 *
 * Сами партнёры заведены в Студии отдельным типом, поэтому добавить нового
 * блогера может сотрудник клиники, без программиста.
 *
 * Если партнёр не найден, молча уводим на главную: ссылка могла устареть,
 * и показывать человеку страницу ошибки из-за нашей внутренней кухни
 * неправильно — он пришёл лечиться, а не разбираться с метками.
 */
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const slug = String(params?.slug || "").slice(0, 64);

  let partner = null;
  try {
    partner = await getPartner(slug);
  } catch {
    partner = null;
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || siteUrl;
  const target = new URL(partner?.target || "/", base);

  if (partner) {
    target.searchParams.set("utm_source", partner.utmSource || slug);
    target.searchParams.set("utm_medium", partner.utmMedium || "blogger");
    if (partner.utmCampaign) target.searchParams.set("utm_campaign", partner.utmCampaign);
    if (partner.utmContent) target.searchParams.set("utm_content", partner.utmContent);
  }

  // 302, а не 301: адрес кампании меняется, а постоянный редирект
  // браузеры и мессенджеры кэшируют намертво.
  return NextResponse.redirect(target.toString(), 302);
}
