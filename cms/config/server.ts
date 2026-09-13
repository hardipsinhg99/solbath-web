import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Behind a TLS-terminating reverse proxy (Traefik/nginx), set PUBLIC_URL to
  // the public https origin and IS_PROXIED=true so Koa trusts X-Forwarded-*
  // and the admin panel's secure cookies can be set. Both unset locally.
  ...(env('PUBLIC_URL') ? { url: env('PUBLIC_URL') } : {}),
  proxy: { koa: env.bool('IS_PROXIED', false) },
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
