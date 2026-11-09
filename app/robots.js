import { siteUrl } from "@/data/site";

export default function robots() {
  return {
    rules: [
      // /report — внутренний отчёт для заказчика, закрыт паролем.
      // Запрет здесь нужен, чтобы адрес не всплыл в выдаче даже
      // ссылкой: пароль защищает содержимое, но не факт существования.
      { userAgent: "*", allow: "/", disallow: "/report" },
      { userAgent: ["GPTBot", "ClaudeBot", "Claude-Web", "PerplexityBot", "Google-Extended", "Applebot-Extended"], allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
