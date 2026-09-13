# SolBath

Bathroom accessories, ceramic tiles, hardware and kitchen fittings catalog.
Two apps in this repo:

- **Frontend** (repo root) — Next.js 16 (App Router), fetches all content from
  the Strapi backend over HTTP and statically prerenders every product,
  category and vertical page.
- **CMS** (`cms/`) — Strapi v5, its own standalone Node/Koa server with its
  own `package.json`/`node_modules`. Not embedded in the Next.js process —
  integration is entirely over the REST API.

## Prerequisites

- Node `>=20 <=26`
- Docker (for local Postgres + MinIO)

## Local development setup

**1. Start Postgres and MinIO:**

```bash
docker compose up -d
```

Postgres on `:5433`, MinIO on `:9000` (API) / `:9001` (console). Both use the
throwaway credentials in `docker-compose.yml` — fine for local dev, replace
with a managed Postgres and a real S3 bucket in production.

**2. Start the CMS:**

```bash
cd cms
npm install
cp .env.example .env   # fill in real values — see the comments in the file
npx tsx scripts/seed.ts   # populate the catalog — see "Seeding data" below
npm run develop
```

Open `http://localhost:1337/admin` and create the first admin user on first
run.

**3. Start the frontend** (in a separate terminal, from the repo root):

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

Open `http://localhost:3000`.

> Running both worktrees/checkouts of this repo at once? Only one dev server
> can hold port 3000 — point the other's `cms/.env` `FRONTEND_URL` and this
> app's dev port at something else instead of fighting over it.

## Content model

Two-level taxonomy: **Vertical → Category → Product**.

- **Vertical** — a fixed enum (`bathroom-accessories`, `ceramic-tiles`,
  `hardware`, `kitchen`). Adding a new one requires a schema change, not just
  content.
- **Category** — belongs to one vertical, has a name/tagline/description and
  a set of filter groups (e.g. Finish, Material) with their own option lists.
- **Product** — belongs to one vertical + category, has name/collection/
  description/specs/finishes/sizes/images/tone, and `featured`/`isNew` flags
  that drive homepage and mega-menu curation.

Everything else (Dealer, Testimonial, InspirationPost, Catalog, SiteSettings,
HomePage) is straightforward single-purpose content feeding specific pages —
see each content type under `cms/src/api/`.

## Seeding data

`cms/seed-data/*.ts` is the source of truth for the catalog — **not** the
admin panel. `cms/scripts/seed.ts` reads those files and upserts into Strapi
by matching on `slug`: creates and publishes anything new, and (for
verticals/categories) updates fields on anything that already exists.

```bash
cd cms
npx tsx scripts/seed.ts
```

Safe to re-run — it won't create duplicates. To add or change catalog
content, edit `cms/seed-data/categories.ts` / `products.ts` (or the other
`seed-data/*.ts` files for dealers, testimonials, etc.) and re-run the
script, rather than hand-editing content directly in the admin, so the repo
stays the actual source of truth for what's in production.

**Two things the seed script does *not* do:**
- **Delete anything.** Removing a product from `seed-data/products.ts` and
  re-running the script does not remove it from Strapi — that needs a
  one-off cleanup pass (see the git history around the last catalog
  replacement for the pattern used).
- **Upload images.** `Product.images` / `Category.image` are media relations
  and have to be attached by hand in the admin panel, per record.

## Known content gaps (current catalog snapshot)

- **3 products still need real description/specs**: the source pages for
  `lapo-heavy-duty-mortise-lock`, `godrej-mortise-lock-1ck-em01`, and
  `duke-dyna-2-1-door-lock` block automated fetching (Amazon anti-bot). Each
  has a `description` explicitly marked "Needs content" flagging this.
- **Most products have no photo yet.** `ProductCard`/`ProductGallery` render
  the real photo when `Product.images` is set and fall back to a generic
  per-tone placeholder otherwise — expected, not a bug, until photos are
  uploaded.
- **Nothing is curated yet.** No product is marked `featured`, and no
  vertical's `popularProducts` list has been populated, so the homepage
  "Featured Products" section and the mega-menu's "Popular" list are empty
  until an editor curates them in the admin.
- **`ceramic-tiles` (whole vertical) and part of `kitchen`** have no
  categories/products yet — those categories were removed rather than left
  as empty placeholders; re-add them once real tile/kitchen-storage content
  exists.

## Production build

```bash
# Frontend
npm run build && npm run start

# CMS
cd cms
npm run build && npm run start
```

If a build's static params look stale (prerendering old slugs after a
catalog change), it's almost always a leftover local `.next/cache` — delete
`.next/` and rebuild. A real CI/deploy pipeline builds from a clean checkout
every time, so this shouldn't come up outside local dev.

**Deploying to real infrastructure?** See [DEPLOYMENT.md](DEPLOYMENT.md) for
the actual deployment target (a Hostinger VPS), required environment
variables, and a step-by-step walkthrough.

## Environment variables

See `.env.example` (frontend) and `cms/.env.example` (CMS) for the full list
with comments. Nothing above is a real secret — every value there is a
placeholder or a local-dev-only default.

## Project structure

```
.
├── src/                  # Next.js app (App Router)
│   ├── app/              # routes
│   ├── components/       # UI components
│   └── lib/
│       ├── cms/          # Strapi fetch client (tags, media URL helper)
│       └── data/         # per-content-type fetch + shape functions
├── cms/                  # Strapi v5 backend
│   ├── src/api/          # content types (controllers/routes/services/schema)
│   ├── src/components/   # shared Strapi components (spec-row, filter-group, ...)
│   ├── seed-data/        # source of truth for seeded content
│   └── scripts/seed.ts   # the seed script itself
└── docker-compose.yml    # local Postgres + MinIO
```
