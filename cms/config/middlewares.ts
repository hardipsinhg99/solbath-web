import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://127.0.0.1:9000', 'http://localhost:9000'],
          'media-src': ["'self'", 'data:', 'blob:', 'http://127.0.0.1:9000', 'http://localhost:9000'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // CORS_ORIGIN: comma-separated allowed origins (e.g. https://test.solbath.com).
  // Unset keeps Strapi's default ('*') for local dev.
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGIN', ['*']),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
