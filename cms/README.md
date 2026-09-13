# SolBath CMS

Strapi v5 backend for the SolBath catalog. See the [repo root README](../README.md)
for full setup, the content model, and how to seed production data — this
file only covers the Strapi CLI commands used day to day.

```bash
npm run develop   # dev server with autoReload — http://localhost:1337/admin
npm run build     # build the admin panel for production
npm run start     # production server (run build first)
```

Data is seeded from `seed-data/*.ts` via `npx tsx scripts/seed.ts` — not
hand-entered in the admin. See the root README's "Seeding data" section.
