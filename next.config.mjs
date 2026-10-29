/** @type {import('next').NextConfig} */

// Старые адреса вида /doctors/oncology вели список онкологов.
// Ведём их на страницу направления, где эти врачи и есть,
// а не в общий список из 148 человек.
const categoryToDepartment = {
  oncology: "oncology",
  surgeons: "oncology",
  urology: "urology",
  urogynecologists: "urology",
  gynecologists: "gynecologists",
  "ivf-specialists": "gynecologists",
  orthopedic: "orthopedic",
  endocrinologists: "endocrinologists",
  neurology: "neurosurgery",
  neurosurgery: "neurosurgery",
  ophthalmolog: "ophthalmolog",
  "ent-doctors": "ent-doctors",
  gastroenterology: "gastroenterology",
  gastroenterologiya: "gastroenterology",
  cardiology: "cardiology",
  "plastic-surgery": "plastic-surgery",
};

// Категории без своего направления — ведём в общий список врачей
const categoriesWithoutDepartment = ["diagnostic", "revmatologi", "vascular-surgery"];

// Политика безопасности контента. Аудит: CSP нет ни у одного из пяти
// конкурентов — это позиция, которую можно занять первыми.
// 'unsafe-inline' для скриптов нужен из-за JSON-LD и инлайнового скрипта темы.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://*.jivosite.com https://code.jivosite.com https://*.jivo.ru",
  "style-src 'self' 'unsafe-inline' https://*.jivosite.com https://*.jivo.ru https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://i.ytimg.com https://img.youtube.com https://mc.yandex.ru https://*.jivosite.com https://*.jivo.ru",
  "font-src 'self' data: https://*.jivosite.com https://*.jivo.ru https://fonts.gstatic.com",
  "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io https://mc.yandex.ru https://*.jivosite.com wss://*.jivosite.com https://*.jivo.ru wss://*.jivo.ru",
  "frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube-nocookie.com https://www.youtube.com https://*.jivosite.com https://*.jivo.ru",
  "media-src 'self' https://cdn.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

// Заголовки безопасности (на своём хостинге их нужно задавать самим)
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Картинки из public/ отдавались с max-age=0 — браузер перекачивал
      // их при каждом открытии сайта. Это около 120 КБ на главной только
      // на плитки и первый экран. Имена файлов мы меняем руками, поэтому
      // не immutable: неделя в кэше плюс неделя на фоновое обновление.
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // основные типы страниц (слаги сохранены при импорте)
      { source: "/bolezni/:slug", destination: "/diseases/:slug", permanent: true },
      { source: "/doctor/:slug", destination: "/doctors/:slug", permanent: true },
      { source: "/diagnostic-packages", destination: "/diagnostics", permanent: true },
      // разделы старого сайта
      { source: "/sales", destination: "/diagnostics", permanent: true },
      { source: "/sales/:slug", destination: "/diagnostics", permanent: true },
      { source: "/medical-tourism-department", destination: "/about", permanent: true },
      { source: "/medical-tourism-department/:slug*", destination: "/about", permanent: true },
      { source: "/uslugi-logistiki", destination: "/about", permanent: true },
      // категории врачей
      ...Object.entries(categoryToDepartment).map(([c, d]) => ({
        source: `/doctors/${c}`,
        destination: `/departments/${d}`,
        permanent: true,
      })),
      ...categoriesWithoutDepartment.map((c) => ({ source: `/doctors/${c}`, destination: "/doctors", permanent: true })),
    ];
  },
};

export default nextConfig;
