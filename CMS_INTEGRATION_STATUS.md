# CMS Integration Status

Last updated: 2026-08-20. Written so this can be revisited without re-deriving it from
conversation history. If you're picking this back up later, read this whole file first.

## Current state: integration complete on this branch (`strapi`)

`strapi` is now the integration branch. Master's frontend work (flipbook viewer, WhatsApp
icon fix, Kitchen vertical, header mega-menu animation) has been merged in, the Kitchen
vertical sync into the Strapi schema/seed-data has been finished and verified, and the
frontend has been fully rewired to fetch from the live Strapi backend instead of the old
static `src/lib/data/*.ts` arrays. Every checklist item below is done and was verified
against the actual running Postgres/MinIO/Strapi/Next.js stack, not just read in isolation.

## Branch map

- **`strapi`** (this branch) — the combined frontend + CMS integration branch. Contains:
  - The Strapi v5 backend at `cms/` (own package.json, own node_modules — a standalone
    Node/Koa server, not embedded in the Next.js process; integration is over HTTP).
  - The full Next.js frontend, now wired to fetch from Strapi (see below) instead of
    static arrays.
- **`master`** — no longer the active integration branch. Its frontend work as of
  2026-08-20 has been merged into `strapi`; further frontend work should happen here on
  `strapi` going forward so it stays wired to the CMS.
- **`payload`** — an earlier, fully abandoned attempt using Payload CMS instead of
  Strapi. Kept only for reference. Do not build on this branch.

## Why Strapi, not Payload

Payload was tried first (embedded directly in the Next.js process). The user decided
against it in favor of Strapi as the more mainstream/battle-tested option. Key
architectural difference: **Strapi cannot embed in the Next.js process** — it's its own
standalone Node/Koa server, own admin panel, own database. Integration is over HTTP
(REST API), not a Local API shortcut.

## Strapi backend

- Content-types: Vertical, Category, Product, Dealer, Testimonial, InspirationPost,
  Catalog, ContactSubmission, QuoteSubmission (all Collection Types) + SiteSettings
  (Single Type). Shared components: `shared.value-item`/`spec-row`/`filter-group`/
  `nav-item`/`social-links`.
- Kitchen vertical is fully synced: `"kitchen"` in the `Vertical.key`/`Vertical.tone`/
  `Product.tone`/`Category.tone`/`InspirationPost.tone` enums, plus `sortOrder`/
  `isActive` on Vertical/Category/Product(sortOrder only)/Catalog and `seoTitle`/
  `seoDescription` on Vertical. `cms/scripts/seed.ts` writes these fields on both create
  **and** update, so re-running the seed backfills them onto pre-existing records too
  (verified: 4 verticals, 12 categories, 36 products, 9 catalogs, 6 dealers — 3 with
  Kitchen linked — all with `sortOrder`/`isActive` populated, no duplicates).
- MinIO (S3-compatible, self-hosted via `docker-compose.yml` at repo root) wired as the
  upload provider. No real product/catalogue files have been uploaded yet — that's a
  content task for whoever has Strapi admin access, not a code task.
- Public role permissions + a Next.js revalidation webhook are both seeded idempotently
  via `cms/src/index.ts`'s `bootstrap()`: public `find`/`findOne` on content types,
  public-`create`-only on ContactSubmission/QuoteSubmission (write-only lead inbox), and
  a `"Next.js revalidation"` webhook pointed at `${FRONTEND_URL}/api/revalidate` firing
  on entry create/update/delete/publish/unpublish. `cms/.env`'s `FRONTEND_URL` must match
  wherever the Next app actually runs (defaults to `http://localhost:3000`).

## Frontend: fetches from Strapi instead of static arrays

- `src/lib/cms/client.ts` — the shared fetch layer (`strapiFetch`/`strapiList`/
  `strapiSingle`/`mediaUrl`/`mediaSizeLabel`). Every request is tagged `"strapi"` plus a
  content-type-specific tag (e.g. `"products"`, `"categories:kitchen"`) and cached for an
  hour as a fallback, with on-demand revalidation doing the real work (see below).
- `src/lib/data/*.ts` — every file now fetches from Strapi. Function *names* were kept
  identical wherever they existed (`getProduct`, `getCategoriesByVertical`,
  `getFeaturedProducts`, etc.) — they're just `async` now. Raw array exports that had no
  external consumer (`products`, `categories`, `catalogs`, `testimonials`, `posts`) were
  dropped entirely in favor of their existing getter functions; raw exports that *did*
  have consumers were replaced with async equivalents (`site` → `getSiteSettings()`,
  `dealers`/`dealerCities` → `getDealers()` with cities derived inline in
  `app/dealers/page.tsx`, `verticalMeta` → `getVerticalMeta()`).
- `whatsappLink(message, whatsappNumber)` — signature changed to accept the number as a
  parameter (was previously reading a module-level `site` constant). Necessary because
  it's called from Client Components (`QuoteForm`, `ProductActions`, `SelectionList`),
  which can't `await` a Strapi fetch themselves — their Server Component parent pages
  fetch `getSiteSettings()` and pass `whatsappNumber` down as a prop instead.
- **Header split** (exactly as planned): `Header.tsx` is now an async Server Component
  that fetches site settings, vertical metadata, and — per vertical — categories and
  "popular" products for the mega menu, then passes it all down as a fully-resolved
  `MegaMenuVerticalItem[]` prop. `HeaderClient.tsx` (new) holds all the interactivity
  (`useState`/`usePathname`/`useSelection`) and receives that data as props.
  `ProductsMegaMenu.tsx` is now purely presentational — it no longer imports anything
  from `@/lib/data/*`, it just renders whatever `verticals` prop it's given.
- Similarly, `CategoryShowcase.tsx` (had the same module-scope-import antipattern as
  Header) is now an async Server Component fetching `getVerticalMeta()` instead of
  spreading it at module scope. `DealerLocator.tsx` (Client) now receives `verticalMeta`
  as a prop from `dealers/page.tsx` instead of importing it directly.
- **Forms wired to real Server Actions**: `src/lib/actions/contact.ts` and
  `src/lib/actions/quote.ts` (`"use server"`) POST to Strapi's `contact-submissions`/
  `quote-submissions` endpoints. `ContactForm.tsx`/`QuoteForm.tsx` use React's
  `useActionState` instead of a fake `handleSubmit` that only flipped local state.
  **Fixed the pre-existing bug** where `persona` was tracked in `QuoteForm`'s local state
  but never actually submitted anywhere — it's now sent as a hidden form field and lands
  in Strapi correctly (verified via an actual submission with `persona: "architect"`).
- **Revalidation**: `src/app/api/revalidate/route.ts` — a Route Handler that checks an
  `x-revalidate-secret` header against `REVALIDATE_SECRET`, maps the webhook payload's
  `model` to the matching cache tag, and calls `revalidateTag(tag, { expire: 0 })` (the
  immediate-expiry form — Next 16 deprecated the single-argument call; `{ expire: 0 }` is
  the documented replacement for "external system needs this to expire right now").
  **Verified end-to-end**: edited a product's name directly in Strapi, confirmed the
  webhook fired and the very next request to that product's page showed the new name,
  with zero redeploy and zero manual cache-busting — then reverted the test edit.
- **Catalogues**: `getCatalogs()` maps Strapi's `catalog.file` media relation straight to
  `Catalog.fileUrl`/`fileSize` — no per-component changes were needed, since
  `CatalogViewButton`/`FlipbookViewer`/the catalogues page were already written to take a
  `fileUrl` prop and treat it as optional. Every catalogue's `fileUrl` is currently
  `undefined` because no real PDFs have been uploaded to Strapi yet (`fileSize` falls
  back to `"Pending upload"`) — once someone uploads a file to a Catalog record in the
  Strapi admin, its real URL and size will appear on the site automatically, no code
  change required.
- `next.config.ts` — added `images.remotePatterns` for `localhost:1337`/`:9000` (Strapi's
  own uploads path and the MinIO bucket) so `next/image` will accept real media URLs once
  they exist; add the production media host here too when deploying.

## Verified

- Full `tsc --noEmit` and `eslint .` pass clean across the whole worktree.
- Every route in the app (`/`, both vertical/category levels, product detail,
  inspiration list/detail, catalogues, dealers, contact, quote, selection, about,
  for-trade) loads with zero console/page errors, driven entirely by live Strapi data.
- The header mega-menu (GSAP hover animation) works identically with server-fetched data
  flowing through the Server→Client split.
- Both `ContactForm` and `QuoteForm` were submitted through the real UI; both landed
  correctly in Strapi (and the persona bug fix was confirmed in the same pass).
- The revalidation webhook was proven end-to-end, not just unit-tested in isolation.

## What's left (content/ops, not code)

- Upload real per-product images and per-catalogue PDFs through the Strapi admin —
  `Product.images`/`Category.image`/`Catalog.file` all exist on the schema and the
  frontend is ready to use them (catalogues automatically will; products/categories
  still render the procedural `Placeholder` component since no code currently prefers a
  real image over it — wiring that in is a small follow-up if/when real product photos
  exist, not attempted here since there was nothing to point it at yet).
- Decide on a production `FRONTEND_URL`/Strapi host and add the production media
  domain to `next.config.ts`'s `remotePatterns` before deploying.
- `CatalogDownloadButton.tsx` is still a placeholder ("Available after CMS setup") —
  wire it to the real file URL once catalogue PDFs exist.
