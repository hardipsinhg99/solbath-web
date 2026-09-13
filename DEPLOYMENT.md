# Deployment (Hostinger)

Both apps need a persistent Node process (the frontend uses ISR + a
dynamic `/api/revalidate` route, Strapi is a standalone Node/Koa server) —
that means a **Hostinger VPS plan** (KVM, root/SSH access), not shared or
static hosting. One VPS running both apps + Postgres is enough for this
catalog's traffic; size up later if needed.

- **RAM**: 4 GB recommended (2 GB works, but Strapi's admin-panel build is
  memory-hungry and will be slow/tight alongside Postgres + Next.js on the
  same box)
- **OS**: Ubuntu (whatever recent LTS Hostinger offers on their VPS plans)

## Stack on the VPS

- **PostgreSQL** — installed directly on the VPS (or run just the
  `postgres` service from this repo's `docker-compose.yml` if you'd rather
  use Docker — drop the `minio` service, it's not needed)
- **Node.js** — a version in this repo's supported range (`>=20 <=26`)
- **PM2** — keeps both apps running as background services with
  auto-restart on crash/reboot
- **Nginx** — reverse proxy + where SSL terminates for both apps
- **Certbot** — free Let's Encrypt certificates for your domain(s)

**Media storage: local disk**, not S3 — the CMS's upload provider defaults
to `local` (writes to `cms/public/uploads`, served by Strapi itself). No
external object-storage account needed. This one directory is the only
thing on the server that isn't reproducible from git + the database dump,
so **back it up** (a cron'd `rsync`/`rclone` to off-site storage, or
whatever backup feature your Hostinger plan includes) and never wipe it on
redeploy.

## 1. DNS

Point your domain at the VPS's IP, plus a subdomain for the CMS:

- `yourdomain.com` → VPS IP (frontend)
- `cms.yourdomain.com` → same VPS IP (Strapi admin + API)

## 2. Server setup

SSH in and install the stack:

```bash
# Node (adjust for whatever LTS you're targeting)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo npm install -g pm2
sudo apt-get install -y nginx postgresql certbot python3-certbot-nginx
```

Create the database:

```bash
sudo -u postgres psql -c "CREATE DATABASE solbath_cms;"
sudo -u postgres psql -c "CREATE USER solbath WITH ENCRYPTED PASSWORD '<real password>';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE solbath_cms TO solbath;"
```

Clone the repo:

```bash
git clone https://github.com/hardipsinhg99/solbath-web.git
cd solbath-web
```

## 3. Configure and start the CMS

```bash
cd cms
cp .env.example .env
```

Fill in `.env` with real values:

- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
  `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` — generate fresh random values,
  never reuse local-dev ones
- `DATABASE_*` — point at the Postgres you just created (`DATABASE_HOST=127.0.0.1`,
  `DATABASE_PORT=5432`, plus the name/user/password above)
- `UPLOAD_PROVIDER=local` (or just leave it unset — that's the default)
- `FRONTEND_URL=https://yourdomain.com`
- `REVALIDATE_SECRET` — generate one, and set the *same* value on the
  frontend in step 4

```bash
npm install
npm run build
npx tsx scripts/seed.ts   # idempotent — populates the catalog once
pm2 start "npm run start" --name solbath-cms
```

Visit `https://cms.yourdomain.com/admin` (once Nginx is set up in step 5)
and create the first admin user.

## 4. Configure and start the frontend

```bash
cd ..   # repo root
cp .env.example .env.local
```

- `STRAPI_URL=https://cms.yourdomain.com`
- `REVALIDATE_SECRET` — must match step 3 exactly

```bash
npm install
npm run build
pm2 start "npm run start" --name solbath-web
pm2 save   # persist across reboots
```

## 5. Nginx + SSL

Two server blocks, one per domain, each proxying to its app's local port
(Next.js on `:3000`, Strapi on `:1337` by default):

```nginx
# /etc/nginx/sites-available/solbath-web
server {
    server_name yourdomain.com;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# /etc/nginx/sites-available/solbath-cms
server {
    server_name cms.yourdomain.com;
    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/solbath-web /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/solbath-cms /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d yourdomain.com -d cms.yourdomain.com
```

Uploaded media is served automatically through the CMS's own Nginx block
(`https://cms.yourdomain.com/uploads/...`) — no separate config needed.

## Post-deploy checklist

- [ ] Confirm the revalidation webhook fires: edit a product in the admin,
      confirm the change appears on the live frontend within a few seconds
      (not the full 1-hour ISR fallback window)
- [ ] Replace the seeded placeholder contact details (email, phone,
      address) via Site Settings in the admin
- [ ] Upload real product photos — nothing is seeded automatically (see
      the root README's "Known content gaps")
- [ ] Mark the products you want featured (`featured: true`) and add
      standout products to each vertical's `popularProducts` — both are
      curated by hand in the admin
- [ ] Finish the 3 hardware products still flagged "Needs content" in
      their description (see the root README)
- [ ] Set up a backup job for `cms/public/uploads` and the Postgres
      database — neither lives in git

## What NOT to do

- Don't run Postgres via the local-dev docker-compose mapping (`:5433`) in
  production — use the VPS's own Postgres on its default port, or a
  properly managed instance.
- Don't commit real values for anything in `.env.example` — generate fresh
  secrets on the server, in the actual `.env` files (which stay untracked).
- Don't skip `npx tsx scripts/seed.ts` — without it the CMS starts with an
  empty catalog.
- Don't delete or overwrite `cms/public/uploads` on redeploy — that's
  where every uploaded product photo actually lives.
