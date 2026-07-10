import Link from "next/link";

export default function DoctorCard({ doc }) {
  return (
    <Link href={`/doctors/${doc.slug}`} className="card card-hover group flex flex-col items-center p-6 text-center">
      <div className="mb-5 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-brand-blue/10 bg-brand-bg">
        {doc.photo ? (
          <img src={doc.photo} alt={doc.name} className="h-full w-full scale-110 object-cover" />
        ) : (
          <span className="text-4xl font-bold text-brand-blue/30">{doc.name.split(" ")[1]?.[0] || "A"}</span>
        )}
      </div>
      <h3 className="mb-1 text-lg font-bold text-brand-ink">{doc.name}</h3>
      <p className="mb-4 text-sm text-brand-ink/60">{doc.spec}</p>
      <span className="mt-auto text-sm font-semibold uppercase text-brand-green transition-colors group-hover:text-brand-blue">
        Подробнее →
      </span>
    </Link>
  );
}
