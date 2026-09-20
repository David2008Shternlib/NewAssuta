// Приём заявок с форм. Отправляет в Telegram, если заданы env-переменные.
// TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (см. .env.local.example).
export async function POST(req) {
  try {
    const data = await req.json();
    // honeypot: если бот заполнил скрытое поле — тихо принимаем и ничего не шлём
    if (data && data.company) return Response.json({ ok: true });

    const { name, phone, comment, country, source } = data || {};
    if (!name || !phone) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

    const text =
      `🩺 Новая заявка (Assuta)\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phone}\n` +
      `Страна: ${country || "-"}\n` +
      `Комментарий: ${comment || "-"}\n` +
      `Страница: ${source || "-"}`;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat = process.env.TELEGRAM_CHAT_ID;
    if (token && chat) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chat, text, disable_web_page_preview: true }),
      });
    } else {
      console.log("[lead] Telegram не настроен. Заявка:\n" + text);
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false }, { status: 500 });
  }
}
