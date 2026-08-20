import { strapiList } from "@/lib/cms/client";
import { Testimonial } from "@/lib/types";

interface StrapiTestimonial {
  documentId: string;
  name: string;
  role: string;
  quote: string;
  rating: number | null;
}

function toTestimonial(raw: StrapiTestimonial): Testimonial {
  return {
    id: raw.documentId,
    name: raw.name,
    role: raw.role,
    quote: raw.quote,
    rating: raw.rating ?? 5,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await strapiList<StrapiTestimonial>(
    "/api/testimonials?pagination[pageSize]=100",
    ["testimonials"],
  );
  return data.map(toTestimonial);
}
