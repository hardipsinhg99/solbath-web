import { mediaUrl, StrapiMedia, strapiList } from "@/lib/cms/client";
import { InspirationPost, PlaceholderTone } from "@/lib/types";

interface StrapiPost {
  slug: string;
  title: string;
  room: string;
  excerpt: string;
  readTime: string;
  tone: PlaceholderTone;
  relatedProducts: { slug: string }[];
  body: string | null;
  coverImage: StrapiMedia | null;
}

function toPost(raw: StrapiPost): InspirationPost {
  return {
    slug: raw.slug,
    title: raw.title,
    room: raw.room,
    excerpt: raw.excerpt,
    readTime: raw.readTime,
    tone: raw.tone,
    relatedProductSlugs: raw.relatedProducts.map((p) => p.slug),
    body: raw.body ?? undefined,
    coverImage: mediaUrl(raw.coverImage),
  };
}

const POST_POPULATE =
  "populate[relatedProducts][fields][0]=slug&populate[coverImage]=true";

export async function getPosts(): Promise<InspirationPost[]> {
  const data = await strapiList<StrapiPost>(
    `/api/inspiration-posts?${POST_POPULATE}&pagination[pageSize]=100`,
    ["posts"],
  );
  return data.map(toPost);
}

export async function getPost(slug: string): Promise<InspirationPost | undefined> {
  const data = await strapiList<StrapiPost>(
    `/api/inspiration-posts?filters[slug][$eq]=${slug}&${POST_POPULATE}&pagination[pageSize]=1`,
    ["posts", `post:${slug}`],
  );
  return data[0] ? toPost(data[0]) : undefined;
}
