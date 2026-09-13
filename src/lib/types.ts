export type Vertical = "bathroom-accessories" | "ceramic-tiles" | "hardware" | "kitchen";

export type PlaceholderTone =
  | "bath"
  | "tile"
  | "hardware"
  | "kitchen"
  | "lifestyle"
  | "neutral"
  | "dark";

export interface Category {
  slug: string;
  vertical: Vertical;
  name: string;
  tagline: string;
  description: string;
  filters: {
    label: string;
    options: string[];
  }[];
  image?: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  vertical: Vertical;
  categorySlug: string;
  name: string;
  collection: string;
  shortDescription: string;
  description: string;
  finishes: string[];
  sizes?: string[];
  specs: SpecRow[];
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  images?: string[];
  tone: PlaceholderTone;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  rating: number;
  categories: Vertical[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface InspirationPost {
  slug: string;
  title: string;
  room: string;
  excerpt: string;
  readTime: string;
  tone: PlaceholderTone;
  relatedProductSlugs: string[];
  body?: string;
  coverImage?: string;
}

export interface Catalog {
  id: string;
  title: string;
  vertical: Vertical | "all";
  fileSize: string;
  fileUrl?: string;
}

export interface SectionHeadingContent {
  eyebrow?: string;
  title: string;
}

export type StatIcon = "award" | "users" | "shield" | "truck";

export interface TrustStat {
  icon: StatIcon;
  label: string;
  detail: string;
}

export type PersonaIcon = "home" | "architect" | "dealer";

export interface Persona {
  icon: PersonaIcon;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export type CtaCardIcon = "map-pin" | "download";
export type CtaCardVariant = "light" | "dark";

export interface CtaCard {
  icon: CtaCardIcon;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  variant: CtaCardVariant;
}

export interface HomePage {
  heroEyebrow: string;
  heroHeading: string;
  heroSubheading: string;
  heroVideoUrl?: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryCtaLabel: string;
  heroSecondaryCtaHref: string;
  trustStats: TrustStat[];
  personaHeading: SectionHeadingContent;
  personas: Persona[];
  featuredProductsHeading: SectionHeadingContent;
  featuredProductSlugs: string[];
  featuredProductsCtaLabel: string;
  featuredProductsCtaHref: string;
  inspirationHeading: SectionHeadingContent;
  inspirationCtaLabel: string;
  testimonialsHeading: SectionHeadingContent;
  ctaCards: CtaCard[];
}
