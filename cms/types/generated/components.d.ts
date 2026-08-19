import type { Schema, Struct } from '@strapi/strapi';

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
      'shared.filter-group': SharedFilterGroup;
      'shared.nav-item': SharedNavItem;
      'shared.social-links': SharedSocialLinks;
      'shared.spec-row': SharedSpecRow;
      'shared.value-item': SharedValueItem;
    }
  }
}
