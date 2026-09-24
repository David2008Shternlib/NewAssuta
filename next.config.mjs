/** @type {import('next').NextConfig} */

// Категории врачей со старого сайта (/doctors/{category}) → на общий список
const doctorCategories = [
  "oncology", "surgeons", "urology", "gynecologists", "orthopedic", "endocrinologists",
  "neurology", "neurosurgery", "ophthalmolog", "ent-doctors", "gastroenterology",
  "cardiology", "plastic-surgery", "urogynecologists", "ivf-specialists",
  "vascular-surgery", "diagnostic", "revmatologi", "gastroenterologiya",
];

// Политика безопасности контента. Аудит: CSP нет ни у одного из пяти
// конкурентов — это позиция, которую можно занять первыми.
// 'unsafe-inline' для скриптов нужен из-за JSON-LD и инлайнового скрипта темы.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://mc.yandex.ru https://*.jivosite.com https://code.jivosite.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://mc.yandex.ru https://*.jivosite.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io https://mc.yandex.ru https://*.jivosite.com wss://*.jivosite.com",
  "frame-src 'self' https://www.google.com https://maps.google.com https://*.jivosite.com",
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
    return [{ source: "/:path*", headers: securityHeaders }];
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
      ...doctorCategories.map((c) => ({ source: `/doctors/${c}`, destination: "/doctors", permanent: true })),
    ];
  },
};

export default nextConfig;
