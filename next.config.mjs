/** @type {import('next').NextConfig} */

// Категории врачей со старого сайта (/doctors/{category}) → на общий список
const doctorCategories = [
  "oncology", "surgeons", "urology", "gynecologists", "orthopedic", "endocrinologists",
  "neurology", "neurosurgery", "ophthalmolog", "ent-doctors", "gastroenterology",
  "cardiology", "plastic-surgery", "urogynecologists", "ivf-specialists",
  "vascular-surgery", "diagnostic", "revmatologi", "gastroenterologiya",
];

const nextConfig = {
  images: { unoptimized: true },
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
