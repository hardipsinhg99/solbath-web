import type { Schema, Struct } from '@strapi/strapi';

export interface HomeCtaCard extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_cards';
  info: {
    description: 'A single banner card in the homepage CTA band (e.g. "Find a Dealer").';
    displayName: 'CTA Card';
    icon: 'cursor';
  };
  attributes: {
    ctaHref: Schema.Attribute.String & Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['map-pin', 'download']> &
      Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.Required;
  };
}

export interface HomePersonaItem extends Struct.ComponentSchema {
  collectionName: 'components_home_persona_items';
  info: {
    description: 'A single "I\'m a..." tile on the homepage persona section.';
    displayName: 'Persona Item';
    icon: 'user';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['home', 'architect', 'dealer']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeStatItem extends Struct.ComponentSchema {
  collectionName: 'components_home_stat_items';
  info: {
    description: 'A single trust-strip stat (e.g. "15+ Years" / "Trusted craftsmanship").';
    displayName: 'Stat Item';
    icon: 'chart-bar';
  };
  attributes: {
    detail: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<['award', 'users', 'shield', 'truck']> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFilterGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_filter_groups';
  info: {
    description: 'A named filter facet (e.g. Finish, Size) with a list of selectable options.';
    displayName: 'Filter Group';
    icon: 'filter';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'shared.value-item', true>;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    description: 'A titled group of links in the site footer.';
    displayName: 'Footer Column';
    icon: 'layout-grid';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.nav-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    description: 'A single primary-navigation link.';
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headings';
  info: {
    description: 'A reusable eyebrow + title pair for a homepage section header.';
    displayName: 'Section Heading';
    icon: 'heading';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Links';
    icon: 'share-alt';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    pinterest: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface SharedSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_spec_rows';
  info: {
    description: 'A single label/value specification row for a product.';
    displayName: 'Spec Row';
    icon: 'list';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedValueItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_value_items';
  info: {
    description: 'A single reusable text value, used to build editor-friendly repeatable lists (finishes, sizes, filter options).';
    displayName: 'Value Item';
    icon: 'circle';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'home.cta-card': HomeCtaCard;
      'home.persona-item': HomePersonaItem;
      'home.stat-item': HomeStatItem;
      'shared.filter-group': SharedFilterGroup;
      'shared.footer-column': SharedFooterColumn;
      'shared.nav-item': SharedNavItem;
      'shared.section-heading': SharedSectionHeading;
      'shared.social-links': SharedSocialLinks;
      'shared.spec-row': SharedSpecRow;
      'shared.value-item': SharedValueItem;
    }
  }
}
