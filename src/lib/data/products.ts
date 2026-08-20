import { strapiList } from "@/lib/cms/client";
import { PlaceholderTone, Product, SpecRow, Vertical } from "@/lib/types";

interface StrapiProduct {
  slug: string;
  name: string;
  collection: string;
  shortDescription: string;
  description: string;
  finishes: { value: string }[];
  sizes: { value: string }[];
  specs: SpecRow[];
  featured: boolean;
  isNew: boolean;
  tone: PlaceholderTone;
  vertical: { key: Vertical } | null;
  category: { slug: string } | null;
}

function toProduct(raw: StrapiProduct): Product {
  return {
    slug: raw.slug,
    vertical: raw.vertical?.key as Vertical,
    categorySlug: raw.category?.slug ?? "",
    name: raw.name,
    collection: raw.collection,
    shortDescription: raw.shortDescription,
    description: raw.description,
    finishes: raw.finishes.map((f) => f.value),
    sizes: raw.sizes.map((s) => s.value),
    specs: raw.specs.map((s) => ({ label: s.label, value: s.value })),
    tags: [...(raw.featured ? ["Bestseller"] : []), ...(raw.isNew ? ["New"] : [])],
    featured: raw.featured,
    isNew: raw.isNew,
    tone: raw.tone,
  };
}

const PRODUCT_POPULATE =
  "populate[vertical][fields][0]=key&populate[category][fields][0]=slug" +
  "&populate[finishes]=true&populate[sizes]=true&populate[specs]=true";

export async function getProductsByCategory(
  vertical: Vertical,
  categorySlug: string,
): Promise<Product[]> {
  const data = await strapiList<StrapiProduct>(
    `/api/products?filters[vertical][key][$eq]=${vertical}&filters[category][slug][$eq]=${categorySlug}` +
      `&sort=sortOrder&${PRODUCT_POPULATE}&pagination[pageSize]=100`,
    ["products", `products:${vertical}:${categorySlug}`],
  );
  return data.map(toProduct);
}

export async function getProductsByVertical(vertical: Vertical): Promise<Product[]> {
  const data = await strapiList<StrapiProduct>(
    `/api/products?filters[vertical][key][$eq]=${vertical}&sort=sortOrder&${PRODUCT_POPULATE}&pagination[pageSize]=100`,
    ["products", `products:${vertical}`],
  );
  return data.map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await strapiList<StrapiProduct>(
    `/api/products?filters[featured][$eq]=true&sort=sortOrder&${PRODUCT_POPULATE}&pagination[pageSize]=100`,
    ["products"],
  );
  return data.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const data = await strapiList<StrapiProduct>(
    `/api/products?filters[slug][$eq]=${slug}&${PRODUCT_POPULATE}&pagination[pageSize]=1`,
    ["products", `product:${slug}`],
  );
  return data[0] ? toProduct(data[0]) : undefined;
}

export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  const data = await strapiList<StrapiProduct>(
    `/api/products?filters[category][slug][$eq]=${product.categorySlug}&filters[slug][$ne]=${product.slug}` +
      `&sort=sortOrder&${PRODUCT_POPULATE}&pagination[pageSize]=${count}`,
    ["products", `products:${product.vertical}:${product.categorySlug}`],
  );
  return data.map(toProduct);
}
