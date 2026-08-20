# CMS Integration Status

Last updated: 2026-08-20. Written so this can be revisited without re-deriving it from
conversation history. If you're picking this back up later, read this whole file first.

## Branch map

- **`master`** — the live/demo frontend. Fully static: every page reads from
  `src/lib/data/*.ts` (hardcoded TS arrays), zero backend, zero network calls for
  content. This is what's meant to be deployed to Vercel for client demos.
  Recently added here (none of it exists on `strapi` yet — see "Branch drift" below):
  - Catalogue flipbook viewer (`src/components/catalogs/FlipbookViewer.tsx` +
    `CatalogViewButton.tsx`) — real PDF page-flip with sound, via `pdfjs-dist` +
    `react-pageflip`. Uses one shared sample PDF (`public/catalogs/sample-catalog.pdf`)
    for every catalogue entry, since no real per-catalogue PDFs exist yet.
  - WhatsApp icon consistency fix — `QuoteForm.tsx`, `ProductActions.tsx`,
    `SelectionList.tsx` now use the real `/whatsapp-current.png` logo instead of a
    generic lucide `MessageCircle` icon, matching `WhatsAppButton.tsx`.
  - A new **Kitchen** vertical: added to `src/lib/types.ts` (`Vertical`,
    `PlaceholderTone`), `src/lib/data/categories.ts` (3 categories + verticalMeta
    entry), `src/lib/data/products.ts` (9 products), `src/lib/data/catalogs.ts` (2
    catalogue entries), `src/lib/data/dealers.ts` (added to 3 dealers' `categories`),
    `src/lib/data/site.ts` (nav + tagline). Also new: `BackToTopButton.tsx`, an
    updated `Hero.tsx`, and new placeholder images for kitchen.

- **`strapi`** — the CMS backend. A standalone Strapi v5 app at `cms/` (own
  package.json, not embedded in the Next.js process — see "Why Strapi, not Payload"
  below). Fully built and independently verified working:
  - Content-types: Vertical, Category, Product, Dealer, Testimonial,
    InspirationPost, Catalog, ContactSubmission, QuoteSubmission (all Collection
    Types) + SiteSettings (Single Type). Shared components:
    `shared.value-item`/`spec-row`/`filter-group`/`nav-item`/`social-links`.
  - MinIO (S3-compatible, self-hosted via `docker-compose.yml` at repo root) wired
    as the upload provider — verified end-to-end (upload → stored in MinIO →
    publicly downloadable URL).
  - Public role permissions seeded idempotently via `cms/src/index.ts` bootstrap:
    public `find`/`findOne` on content types, public-`create`-only (no `find`) on
    ContactSubmission/QuoteSubmission so they're a write-only lead inbox.
  - Seed data at `cms/seed-data/*.ts` — **a deliberate point-in-time copy** of the
    original static data (kept separate from `src/lib/data/*.ts` on purpose, so the
    seed script has a stable source once the frontend files get rewritten to fetch
    from Strapi instead).
  - **Kitchen vertical was just synced into this branch's schema + seed-data** (in
    an isolated git worktree at `../solbath-web-strapi`, not yet merged back — see
    "Immediate next steps" below): added `"kitchen"` to the `Vertical.key` and
    `Vertical.tone`/`Product.tone` enums (the `Product.tone` gap would have made
    seeding kitchen products fail outright), plus new `sortOrder`/`isActive`
    fields on Vertical/Category/Catalog and `seoTitle`/`seoDescription` on
    Vertical, requested via a staging folder the user created
    (`cms-seed-data-staging/` on `master`).
  - **NOT yet done on this branch**: `cms/scripts/seed.ts` doesn't write the new
    `sortOrder`/`isActive` fields yet, Strapi types haven't been regenerated, and
    the updated seed hasn't been run against the actual database yet.

- **`payload`** — an earlier, fully abandoned attempt using Payload CMS instead of
  Strapi. Kept only for reference. Do not build on this branch.

## Why Strapi, not Payload

Payload was tried first (embedded directly in the Next.js process). The user
decided against it in favor of Strapi as the more mainstream/battle-tested option.
Key architectural difference: **Strapi cannot embed in the Next.js process** — it's
its own standalone Node/Koa server, own admin panel, own database. Integration is
over HTTP (REST API), not a Local API shortcut.

## Branch drift problem (unresolved, blocks integration)

`strapi` was forked from `master` **before** the flipbook viewer, the WhatsApp icon
fix, the Kitchen vertical, and other recent frontend work. If the FE→Strapi
data-fetching layer gets built directly on `strapi` as originally planned, it would
wire Strapi into an **older snapshot of the frontend** — shipping that would mean
losing everything added to `master` since the fork.

This needs a decision before frontend integration starts:
1. **Merge/rebase `master`'s latest frontend work into `strapi`**, then build the
   Strapi data-fetching layer on top of the combined state (leaning towards this
   one — keeps the CMS work isolated until it's ready), or
2. Treat `master` as the integration branch going forward instead.

Not yet decided as of this writing.

## What "full FE+Strapi integration" requires (none of this exists yet)

- [ ] Rewrite `src/lib/data/*.ts` to fetch from Strapi's REST API instead of the
      static arrays — keep the same exported function names/signatures so most
      call sites only need `await` added.
- [ ] Split `src/components/layout/Header.tsx` into a Server Component (does the
      Strapi fetch for the mega-menu's categories + popular products) + a Client
      Component (keeps `useState`/`usePathname`/`useSelection` interactivity) — it
      currently fetches data synchronously in a Client Component, which breaks once
      that data is a network call.
- [ ] Wire `ContactForm.tsx`/`QuoteForm.tsx` to real Server Actions posting to
      Strapi's `contact-submissions`/`quote-submissions` endpoints (`QuoteForm` also
      needs to start actually sending `persona` in the payload — it's tracked in
      local state today but never submitted anywhere, a pre-existing bug unrelated
      to Strapi).
- [ ] Revalidation: a Strapi webhook → a new Next.js route handler → `revalidateTag`,
      so editing content in Strapi actually updates the live site without a
      redeploy.
- [ ] Point `FlipbookViewer`/`CatalogViewButton` at each catalogue's real
      Strapi-hosted file instead of the one shared sample PDF.
- [ ] End-to-end verification that every page still renders correctly against live
      Strapi data (not just that Strapi returns data in isolation).

**Bottom line: not ready to go live with FE+Strapi integration.** The backend is
solid and independently verified; the frontend has zero wiring to it yet, and the
branch-drift problem above needs resolving first.

## Immediate next steps (in-flight, not finished)

Currently working in an isolated git worktree at `../solbath-web-strapi` (checked
out to `strapi`, `npm install` already done there) syncing the Kitchen vertical
into the Strapi schema/seed-data — this is backend-only syncing, not frontend
integration. Remaining to finish that specific task:
1. Update `cms/scripts/seed.ts` to write `sortOrder`/`isActive` on
   Vertical/Category/Product/Catalog (for both the original content and the new
   Kitchen entries).
2. Regenerate Strapi TS types (`npm run generate:types` equivalent) in the
   worktree.
3. Boot Strapi in the worktree and run the updated seed script against the
   existing Postgres/MinIO containers (already running, data intact).
4. Verify: Kitchen vertical/categories/products/catalogues appear correctly in the
   Strapi admin, existing content wasn't duplicated, `sortOrder`/`isActive` are
   populated.
5. Decide what to do with the worktree's changes (merge into `strapi` branch, or
   fold into whatever the branch-drift decision above produces).
