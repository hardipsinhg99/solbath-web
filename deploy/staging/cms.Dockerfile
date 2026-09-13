# syntax=docker/dockerfile:1.7
# Strapi 5 CMS. Build context is cms/ (see deploy/staging/README.md).
ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-bookworm-slim
WORKDIR /app

COPY package.json package-lock.json ./
# Dev dependencies stay installed: scripts/seed.ts runs through tsx.
RUN npm ci

COPY . .

# `strapi build` compiles the admin panel and dereferences these while loading
# config/. Throwaway values are for BUILD time only - the real secrets arrive at
# runtime through env_file, so nothing sensitive is baked into an image layer.
# PUBLIC_URL is deliberately unset here so the admin panel calls its API on a
# relative (same-origin) URL.
ENV NODE_ENV=production \
    DATABASE_CLIENT=postgres \
    APP_KEYS=build,build \
    API_TOKEN_SALT=build \
    ADMIN_JWT_SECRET=build \
    TRANSFER_TOKEN_SALT=build \
    JWT_SECRET=build \
    ENCRYPTION_KEY=build0000000000000000000000000000
RUN npm run build

# public/uploads is bind-mounted at runtime; created here so the path exists and
# is owned by node if the mount is ever missing.
RUN mkdir -p public/uploads && chown -R node:node /app

USER node
EXPOSE 1337
HEALTHCHECK --interval=30s --timeout=5s --start-period=120s --retries=5 \
  CMD node -e "require('http').get('http://127.0.0.1:1337/_health',r=>process.exit(r.statusCode<500?0:1)).on('error',()=>process.exit(1))"
CMD ["npm", "run", "start"]
