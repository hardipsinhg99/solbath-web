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
  'api::contact-submission.contact-submission.create',
  'api::quote-submission.quote-submission.create',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

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
  },
};
