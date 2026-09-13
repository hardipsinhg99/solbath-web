import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Maps a Strapi webhook payload's `model` (content-type UID) to the cache
// tag used when fetching that content type in src/lib/data/*.ts. Falls back
// to revalidating everything ("strapi") for models not listed here, so a new
// content type never silently goes stale.
const MODEL_TAGS: Record<string, string> = {
  vertical: "verticals",
  category: "categories",
  product: "products",
  dealer: "dealers",
  testimonial: "testimonials",
  "inspiration-post": "posts",
  catalog: "catalogs",
  "site-setting": "site-settings",
  "home-page": "home-page",
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ revalidated: false, error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const model = typeof body?.model === "string" ? body.model : undefined;
  const tag = (model && MODEL_TAGS[model]) || "strapi";

  // Webhooks need the tag to expire immediately (not the stale-while-revalidate
  // "max" profile), since Strapi calls this once right after a save and the
  // editor expects the very next page load to show the new content.
  revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tag });
}
