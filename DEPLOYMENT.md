# Deployment

This is a small B2B catalog + lead-gen site, not high-traffic e-commerce —
size accordingly. Two apps + one database, deployed separately:

| Piece | Recommended service | Why |
|---|---|---|
| Frontend (repo root) | **AWS Amplify Hosting** | Purpose-built for Next.js (App Router, ISR, on-demand revalidation). Deploys straight from this git repo, no server to manage. |
| CMS (`cms/`) | **Elastic Beanstalk** (Node.js platform) or **Lightsail** | Both run the Strapi Node app without touching Docker/ECS. Beanstalk auto-provisions a load balancer + auto-scaling; Lightsail is a flat-fee VM — cheaper and simpler if you don't need auto-scaling yet. |
| Database | **RDS for PostgreSQL** | Managed backups, patching, failover. Don't run Postgres yourself in production — `docker-compose.yml` at the repo root is for local dev only. |
| Media uploads | **S3** | `@strapi/provider-upload-aws-s3` is already wired up (see `cms/config/plugins.ts`) — MinIO (also via `docker-compose.yml`) is only a local stand-in for the same provider. |
| Domain/SSL | **Route 53 + ACM** | Amplify and Beanstalk both provision free SSL certs through ACM automatically. |

Rough sizing/cost: Amplify ~$5–15/mo, Strapi on Lightsail (1–2GB) ~$10–20/mo
*or* on Beanstalk (t3.small/t4g.small + ALB) ~$35–50/mo, RDS
`db.t4g.micro` single-AZ ~$15/mo, S3 pay-per-use ~$1–5/mo. Start on
Lightsail — migrating to Beanstalk/ECS later needs no app code changes.

## 1. Provision the database

Create an RDS PostgreSQL instance (`db.t4g.micro` is plenty to start).
Note the endpoint, database name, username, and password — these become
`DATABASE_HOST`/`DATABASE_NAME`/`DATABASE_USERNAME`/`DATABASE_PASSWORD` for
the CMS. Set `DATABASE_PORT=5432` (RDS default, not the `5433` used by the
local docker-compose mapping) and `DATABASE_SSL=true`.

## 2. Provision media storage

Create an S3 bucket (private, not public-read — Strapi generates signed/
public URLs itself via `baseUrl`) and an IAM user scoped to just that
bucket (`s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`,
`s3:PutObjectAcl`, `s3:ListBucket`). These map to the CMS's
`MINIO_*`-named env vars (see `cms/.env.example`) — the variable names are
a holdover from local dev using MinIO, but the same `aws-s3` provider reads
them for real S3:

- `MINIO_ENDPOINT` → `https://s3.<your-bucket-region>.amazonaws.com`
- `MINIO_BUCKET` → your bucket name
- `MINIO_ACCESS_KEY` / `MINIO_SECRET_KEY` → the IAM user's keys
- `MINIO_PUBLIC_URL` → the same as `MINIO_ENDPOINT`, or a CloudFront
  distribution in front of the bucket
- `MINIO_REGION` → your bucket's actual AWS region (defaults to
  `us-east-1` if unset — **must match your bucket's real region** or
  uploads/downloads will fail)

## 3. Deploy the CMS (Strapi)

On Elastic Beanstalk or Lightsail, running the `cms/` directory as its own
Node app:

```bash
cd cms
npm install
npm run build      # builds the admin panel
npm run start       # production server — put this behind your platform's process manager
```

Set every variable in `cms/.env.example` as real environment variables on
the platform (not a committed `.env` file) — in particular:

- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
  `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` — generate fresh random values
  for production, never reuse the ones from local dev
- `DATABASE_*` — from step 1
- `MINIO_*` — from step 2
- `FRONTEND_URL` — the production frontend's real URL (used to build the
  revalidation webhook target)
- `REVALIDATE_SECRET` — generate one, and set the *same* value on the
  frontend in step 4

**Seed the catalog once, against this production database:**

```bash
npx tsx scripts/seed.ts
```

This is idempotent (safe to re-run), and creates the first pass of
verticals/categories/products/dealers/testimonials/catalogs/site
settings/home page from `cms/seed-data/*.ts`. Then create the first admin
user by visiting `https://<your-cms-domain>/admin`.

## 4. Deploy the frontend (Amplify)

Connect this repo to Amplify Hosting. Since the frontend lives at the repo
root and `cms/` is a separate app in a subfolder, point Amplify's build at
the repo root (default) — it only needs `package.json`/`next.config.ts`
there and never touches `cms/`.

Environment variables (from `.env.example`):
- `STRAPI_URL` — the CMS's production URL from step 3
- `REVALIDATE_SECRET` — must match step 3 exactly

## 5. Domain + SSL

Route 53 for DNS, ACM for certificates — both Amplify and Beanstalk
provision/attach ACM certs automatically once the domain is pointed at
them.

## Post-deploy checklist

- [ ] Confirm the revalidation webhook actually fires: edit a product in
      the CMS admin, confirm the change appears on the live frontend
      within a few seconds (not the full 1-hour ISR fallback window)
- [ ] Replace the seeded placeholder contact details (email, phone,
      address) via Site Settings in the admin
- [ ] Upload real product photos — nothing is seeded automatically (see
      the root README's "Known content gaps")
- [ ] Mark the products you want featured (`featured: true`) and add
      standout products to each vertical's `popularProducts` — both are
      curated by hand in the admin, not derived from any flag in the seed
      data
- [ ] Finish the 3 hardware products still flagged "Needs content" in
      their description (see the root README)
- [ ] Point real DNS at Amplify + your CMS host, confirm HTTPS on both

## What NOT to do

- Don't run Postgres or MinIO yourself in production — `docker-compose.yml`
  here is local-dev-only.
- Don't commit real values for anything in `.env.example` — generate fresh
  secrets per environment and set them as platform environment variables.
- Don't skip step 3's `npx tsx scripts/seed.ts` — without it the CMS
  starts with an empty catalog (no verticals/categories/products exist
  until the seed script or an admin creates them).
