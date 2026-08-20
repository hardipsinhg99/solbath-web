const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiSingleResponse<T> {
  data: T | null;
}

// Every fetch is tagged "strapi" (a blanket tag the revalidation webhook always
// includes) plus whatever specific tags the caller passes, so a single
// content-type webhook can revalidate just its own tag without invalidating
// everything else.
async function strapiFetch<T>(path: string, tags: string[] = []): Promise<T> {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    next: { revalidate: 3600, tags: ["strapi", ...tags] },
  });

  if (!res.ok) {
    throw new Error(`Strapi request failed (${res.status} ${res.statusText}): ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function strapiList<T>(path: string, tags?: string[]): Promise<T[]> {
  const json = await strapiFetch<StrapiListResponse<T>>(path, tags);
  return json.data;
}

export async function strapiSingle<T>(path: string, tags?: string[]): Promise<T | null> {
  const json = await strapiFetch<StrapiSingleResponse<T>>(path, tags);
  return json.data;
}

export interface StrapiMedia {
  url: string;
  size?: number;
}

export function mediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

export function mediaSizeLabel(media?: StrapiMedia | null): string | undefined {
  if (!media?.size) return undefined;
  return `${(media.size / 1024).toFixed(1)} MB`;
}
