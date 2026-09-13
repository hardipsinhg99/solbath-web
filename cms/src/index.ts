import type { Core } from '@strapi/strapi';

const PUBLIC_PERMISSIONS = [
  'api::vertical.vertical.find',
  'api::vertical.vertical.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::product.product.find',
  'api::product.product.findOne',
  'api::dealer.dealer.find',
  'api::dealer.dealer.findOne',
  'api::testimonial.testimonial.find',
  'api::testimonial.testimonial.findOne',
  'api::inspiration-post.inspiration-post.find',
  'api::inspiration-post.inspiration-post.findOne',
  'api::catalog.catalog.find',
  'api::catalog.catalog.findOne',
  'api::site-setting.site-setting.find',
  'api::home-page.home-page.find',
  'api::contact-submission.contact-submission.create',
  'api::quote-submission.quote-submission.create',
];

const REVALIDATE_WEBHOOK_NAME = 'Next.js revalidation';
const REVALIDATE_EVENTS = [
  'entry.create',
  'entry.update',
  'entry.delete',
  'entry.publish',
  'entry.unpublish',
];

interface WebhookRecord {
  id: string;
  name: string;
  url: string;
  headers: Record<string, string>;
  events: string[];
  isEnabled: boolean;
}

interface WebhookStore {
  findWebhooks(): Promise<WebhookRecord[]>;
  createWebhook(data: Omit<WebhookRecord, 'id' | 'isEnabled'>): Promise<WebhookRecord>;
  updateWebhook(id: string, data: Omit<WebhookRecord, 'id'>): Promise<WebhookRecord | null>;
}

async function syncRevalidationWebhook(strapi: Core.Strapi) {
  const frontendUrl = process.env.FRONTEND_URL;
  const secret = process.env.REVALIDATE_SECRET;
  if (!frontendUrl || !secret) {
    strapi.log.warn(
      'FRONTEND_URL or REVALIDATE_SECRET not set — skipping the Next.js revalidation webhook.',
    );
    return;
  }

  const webhookStore = strapi.get('webhookStore') as WebhookStore;
  const url = `${frontendUrl}/api/revalidate`;
  const headers = { 'x-revalidate-secret': secret };

  const existing = (await webhookStore.findWebhooks()).find(
    (hook) => hook.name === REVALIDATE_WEBHOOK_NAME,
  );

  const desired = { name: REVALIDATE_WEBHOOK_NAME, url, headers, events: REVALIDATE_EVENTS };

  if (!existing) {
    await webhookStore.createWebhook(desired);
    strapi.log.info(`Created "${REVALIDATE_WEBHOOK_NAME}" webhook -> ${url}`);
  } else if (
    existing.url !== url ||
    JSON.stringify(existing.headers) !== JSON.stringify(headers) ||
    JSON.stringify(existing.events) !== JSON.stringify(REVALIDATE_EVENTS) ||
    !existing.isEnabled
  ) {
    await webhookStore.updateWebhook(existing.id, { ...desired, isEnabled: true });
    strapi.log.info(`Updated "${REVALIDATE_WEBHOOK_NAME}" webhook -> ${url}`);
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      for (const action of PUBLIC_PERMISSIONS) {
        const existing = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { role: publicRole.id, action } });

        if (!existing) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action, role: publicRole.id },
          });
        }
      }

      strapi.log.info(`Public role permissions synced (${PUBLIC_PERMISSIONS.length} actions).`);
    }

    await syncRevalidationWebhook(strapi);
  },
};
