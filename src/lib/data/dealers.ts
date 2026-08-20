import { strapiList } from "@/lib/cms/client";
import { Dealer, Vertical } from "@/lib/types";

interface StrapiDealer {
  documentId: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  rating: number | null;
  categories: { key: Vertical }[];
}

function toDealer(raw: StrapiDealer): Dealer {
  return {
    id: raw.documentId,
    name: raw.name,
    city: raw.city,
    state: raw.state,
    address: raw.address,
    phone: raw.phone,
    rating: raw.rating ?? 0,
    categories: raw.categories.map((c) => c.key),
  };
}

export async function getDealers(): Promise<Dealer[]> {
  const data = await strapiList<StrapiDealer>(
    "/api/dealers?populate[categories][fields][0]=key&sort=name&pagination[pageSize]=200",
    ["dealers"],
  );
  return data.map(toDealer);
}

export async function getDealersByCity(city?: string): Promise<Dealer[]> {
  const dealers = await getDealers();
  if (!city) return dealers;
  return dealers.filter((d) => d.city.toLowerCase() === city.toLowerCase());
}
