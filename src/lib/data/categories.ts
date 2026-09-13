import { mediaUrl, StrapiMedia, strapiList } from "@/lib/cms/client";
import { Category, PlaceholderTone, Vertical } from "@/lib/types";

interface StrapiVertical {
  key: Vertical;
  name: string;
  slug: string;
  tagline: string;
  heroDescription: string | null;
  tone: PlaceholderTone;
  heroImage?: StrapiMedia | null;
  popularProducts: { slug: string; name: string }[];
}

interface StrapiCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string | null;
  vertical: { key: Vertical } | null;
  filters: { label: string; options: { value: string }[] }[];
  image?: StrapiMedia | null;
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
    image: mediaUrl(raw.image),
  };
}

const CATEGORY_POPULATE =
  "populate[vertical][fields][0]=key&populate[filters][populate]=options" +
  "&populate[image][fields][0]=url";

export type VerticalMeta = Record<
  Vertical,
  {
    name: string;
    slug: Vertical;
    tagline: string;
    description: string;
    tone: PlaceholderTone;
    image?: { src: string; alt: string };
    popularProducts: { slug: string; name: string }[];
  }
>;

export async function getVerticalMeta(): Promise<VerticalMeta> {
  const data = await strapiList<StrapiVertical>(
    "/api/verticals?sort=sortOrder&filters[isActive][$eq]=true&pagination[pageSize]=100" +
      "&populate[heroImage][fields][0]=url" +
      "&populate[popularProducts][fields][0]=slug&populate[popularProducts][fields][1]=name",
    ["verticals"],
  );

  const result = {} as VerticalMeta;
  for (const v of data) {
    const src = mediaUrl(v.heroImage);
    result[v.key] = {
      name: v.name,
      slug: v.key,
      tagline: v.tagline,
      description: v.heroDescription ?? "",
      tone: v.tone,
      image: src ? { src, alt: v.name } : undefined,
      popularProducts: v.popularProducts,
    };
  }
  return result;
}

export async function getCategoriesByVertical(vertical: Vertical): Promise<Category[]> {
  const data = await strapiList<StrapiCategory>(
    `/api/categories?filters[vertical][key][$eq]=${vertical}&filters[isActive][$eq]=true&sort=sortOrder` +
      `&${CATEGORY_POPULATE}&pagination[pageSize]=100`,
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
      `&${CATEGORY_POPULATE}&pagination[pageSize]=1`,
    ["categories", `category:${vertical}:${slug}`],
  );
  return data[0] ? toCategory(data[0]) : undefined;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await strapiList<StrapiCategory>(
    "/api/categories?filters[isActive][$eq]=true&sort=sortOrder" +
      `&${CATEGORY_POPULATE}&pagination[pageSize]=100`,
    ["categories"],
  );
  return data.map(toCategory);
}
