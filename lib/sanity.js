import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ogu6ewxe",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const DOC = `{ "slug": slug.current, name, "spec": coalesce(specialization, department), "dept": department, "photo": photo.asset->url, bodyHtml }`;
const DIS = `{ "slug": slug.current, title, category, excerpt, "image": image.asset->url, bodyHtml }`;

export async function getAllDoctors() {
  return sanity.fetch(`*[_type=="doctor" && defined(slug.current)]|order(name asc)${DOC}`);
}
export async function getDoctor(slug) {
  return sanity.fetch(`*[_type=="doctor" && slug.current==$slug][0]${DOC}`, { slug });
}
export async function getDoctorsByCategory(category) {
  return sanity.fetch(`*[_type=="doctor" && department==$c && defined(slug.current)][0...3]${DOC}`, { c: category || "" });
}
export async function getAllDiseases() {
  return sanity.fetch(`*[_type=="disease" && defined(slug.current)]|order(category asc, title asc)${DIS}`);
}
export async function getDisease(slug) {
  return sanity.fetch(`*[_type=="disease" && slug.current==$slug][0]${DIS}`, { slug });
}
