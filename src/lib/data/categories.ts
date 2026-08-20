import { strapiList } from "@/lib/cms/client";
import { Category, PlaceholderTone, Vertical } from "@/lib/types";

interface StrapiVertical {
  key: Vertical;
  name: string;
  slug: string;
  tagline: string;
  tone: PlaceholderTone;
}

interface StrapiCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string | null;
  vertical: { key: Vertical } | null;
  filters: { label: string; options: { value: string }[] }[];
}

function toCategory(raw: StrapiCategory): Category {
  return {
    slug: raw.slug,
    vertical: raw.vertical?.key as Vertical,
    name: raw.name,
    tagline: raw.tagline,
    description: raw.description ?? "",
    filters: raw.filters.map((f) => ({
      label: f.label,
      options: f.options.map((o) => o.value),
    })),
  };
}

export type VerticalMeta = Record<
  Vertical,
  { name: string; slug: Vertical; tagline: string; tone: PlaceholderTone }
>;

export async function getVerticalMeta(): Promise<VerticalMeta> {
  const data = await strapiList<StrapiVertical>(
    "/api/verticals?sort=sortOrder&filters[isActive][$eq]=true&pagination[pageSize]=100",
    ["verticals"],
  );

  const result = {} as VerticalMeta;
  for (const v of data) {
    result[v.key] = { name: v.name, slug: v.key, tagline: v.tagline, tone: v.tone };
  }
  return result;
}

export async function getCategoriesByVertical(vertical: Vertical): Promise<Category[]> {
  const data = await strapiList<StrapiCategory>(
    `/api/categories?filters[vertical][key][$eq]=${vertical}&filters[isActive][$eq]=true&sort=sortOrder` +
      `&populate[vertical][fields][0]=key&populate[filters][populate]=options&pagination[pageSize]=100`,
    ["categories", `categories:${vertical}`],
  );
  return data.map(toCategory);
}

export async function getCategory(
  vertical: Vertical,
  slug: string,
): Promise<Category | undefined> {
  const data = await strapiList<StrapiCategory>(
    `/api/categories?filters[vertical][key][$eq]=${vertical}&filters[slug][$eq]=${slug}` +
      `&populate[vertical][fields][0]=key&populate[filters][populate]=options&pagination[pageSize]=1`,
    ["categories", `category:${vertical}:${slug}`],
  );
  return data[0] ? toCategory(data[0]) : undefined;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await strapiList<StrapiCategory>(
    "/api/categories?filters[isActive][$eq]=true&sort=sortOrder" +
      "&populate[vertical][fields][0]=key&populate[filters][populate]=options&pagination[pageSize]=100",
    ["categories"],
  );
  return data.map(toCategory);
}
