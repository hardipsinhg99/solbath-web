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

## Production build — verified 2026-08-20

Both apps build and run in production mode, not just `dev`:

- **Frontend**: `npm run build` succeeds. `generateStaticParams` was added to the
  vertical/category/product/inspiration-detail pages, so the build now statically
  prerenders all 71 content pages (4 verticals, 12 categories, 36 products, 4 posts,
  plus the fixed routes) at build time. Only `/quote` (reads `searchParams`) and
  `/api/revalidate` (the webhook target) are server-rendered on demand, as expected.
  Ran `next start` and hit all 25 routes (including a deliberate 404 and `/quote` with
  query params) — zero console/page errors, correct HTTP status on every one.
- **Backend**: `npm run build` (in `cms/`) succeeds — TS compile + admin panel build.
  Ran `npm run start` (production mode, not `develop`) against the built `dist/` and
  confirmed the API serves correctly and the bootstrap (permission sync + webhook sync)
  still runs correctly and idempotently on a production boot.
- No secrets are committed (`.env`/`.env.local` are gitignored in both apps, confirmed
  via `git ls-files`), and `package-lock.json` exists for both apps.

## Deployment checklist (what still needs real values before going live)

Everything below is either a config value only *you* can supply (a real domain, a
production secret) or a one-time step outside this codebase — none of it is unfinished
code.

**Frontend** (wherever it's hosted — e.g. Vercel):
- [ ] Set `STRAPI_URL` to the production Strapi API's real URL (currently
      `http://localhost:1337` in `.env.local`, which is gitignored and dev-only).
- [ ] Set `REVALIDATE_SECRET` to a freshly generated production value (currently a dev
      value in `.env.local`) — must match the Strapi backend's `REVALIDATE_SECRET`.
- [ ] Add the production Strapi/media host to `next.config.ts`'s
      `images.remotePatterns` (currently only `localhost:1337`/`:9000` for local dev) —
      required before any real uploaded image will render.

**Backend** (wherever Strapi is hosted):
- [ ] Point `DATABASE_*` at the production Postgres instance (currently the local
      Docker container on `127.0.0.1:5433`).
- [ ] Point `MINIO_*` at production object storage, or swap the upload provider — the
      local MinIO container isn't reachable outside this machine. `cms/package.json`
      already depends on `@strapi/provider-upload-aws-s3`, which works against real S3
      too, not just MinIO — just change the endpoint/credentials.
- [ ] Generate fresh production secrets for `APP_KEYS`, `API_TOKEN_SALT`,
      `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` — the
      values in `cms/.env` are dev-only and gitignored; never reuse them in production.
- [ ] Set `FRONTEND_URL` to the production frontend's real URL and `REVALIDATE_SECRET`
      to match the frontend's value exactly — `cms/src/index.ts`'s bootstrap will then
      automatically create/update the revalidation webhook to point at it on next boot.
- [ ] Run `cms/scripts/seed.ts` once against the production database (or re-create the
      content manually through the admin) — the seed script is idempotent, so running it
      again later is always safe.

**Content** (not a deploy blocker, but the site will look unfinished without it):
- [ ] Upload real product photos, category images, and per-catalogue PDFs through the
      Strapi admin — schema support exists (`Product.images`, `Category.image`,
      `Catalog.file`), nothing currently has a real file attached.
- [ ] Replace the seeded placeholder contact details (`hello@solbath.example`, etc.) via
      Site Settings in the Strapi admin.

**Small code follow-ups, not blockers** (nothing to point them at yet, so not attempted):
- Products/categories still render the procedural `Placeholder` component even though
  `Product.images`/`Category.image` exist on the schema — once real product photos are
  uploaded, swap `ProductCard`/`ProductGallery`/`CategoryShowcase` to prefer the real
  image when present, falling back to `Placeholder` otherwise.
- `CatalogDownloadButton.tsx` is still a placeholder ("Available after CMS setup") — wire
  it to the real file URL once catalogue PDFs exist.
