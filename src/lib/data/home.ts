import { mediaUrl, StrapiMedia, strapiSingle } from "@/lib/cms/client";
import {
  CtaCard,
  HomePage,
  Persona,
  SectionHeadingContent,
  TrustStat,
} from "@/lib/types";

interface StrapiSectionHeading {
  eyebrow: string | null;
  title: string;
}

interface StrapiStatItem {
  icon: TrustStat["icon"];
  label: string;
  detail: string;
}

interface StrapiPersonaItem {
  icon: Persona["icon"];
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

interface StrapiCtaCard {
  icon: CtaCard["icon"];
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  variant: CtaCard["variant"];
}

interface StrapiHomePage {
  heroEyebrow: string | null;
  heroHeading: string;
  heroSubheading: string | null;
  heroVideo: StrapiMedia | null;
  heroPrimaryCtaLabel: string | null;
  heroPrimaryCtaHref: string | null;
  heroSecondaryCtaLabel: string | null;
  heroSecondaryCtaHref: string | null;
  trustStats: StrapiStatItem[];
  personaHeading: StrapiSectionHeading | null;
  personas: StrapiPersonaItem[];
  featuredProductsHeading: StrapiSectionHeading | null;
  featuredProducts: { slug: string }[];
  featuredProductsCtaLabel: string | null;
  featuredProductsCtaHref: string | null;
  inspirationHeading: StrapiSectionHeading | null;
  inspirationCtaLabel: string | null;
  testimonialsHeading: StrapiSectionHeading | null;
  ctaCards: StrapiCtaCard[];
}

function toSectionHeading(raw: StrapiSectionHeading | null, fallbackTitle: string): SectionHeadingContent {
  return { eyebrow: raw?.eyebrow ?? undefined, title: raw?.title ?? fallbackTitle };
}

function toHomePage(raw: StrapiHomePage): HomePage {
  return {
    heroEyebrow: raw.heroEyebrow ?? "",
    heroHeading: raw.heroHeading,
    heroSubheading: raw.heroSubheading ?? "",
    heroVideoUrl: mediaUrl(raw.heroVideo),
    heroPrimaryCtaLabel: raw.heroPrimaryCtaLabel ?? "",
    heroPrimaryCtaHref: raw.heroPrimaryCtaHref ?? "/",
    heroSecondaryCtaLabel: raw.heroSecondaryCtaLabel ?? "",
    heroSecondaryCtaHref: raw.heroSecondaryCtaHref ?? "/",
    trustStats: raw.trustStats.map((s) => ({ icon: s.icon, label: s.label, detail: s.detail })),
    personaHeading: toSectionHeading(raw.personaHeading, "However you build, we have a path for you"),
    personas: raw.personas.map((p) => ({
      icon: p.icon,
      title: p.title,
      description: p.description,
      href: p.href,
      ctaLabel: p.ctaLabel,
    })),
    featuredProductsHeading: toSectionHeading(
      raw.featuredProductsHeading,
      "Featured across the collection",
    ),
    featuredProductSlugs: raw.featuredProducts.map((p) => p.slug),
    featuredProductsCtaLabel: raw.featuredProductsCtaLabel ?? "",
    featuredProductsCtaHref: raw.featuredProductsCtaHref ?? "/kitchen",
    inspirationHeading: toSectionHeading(
      raw.inspirationHeading,
      "Ideas for every room, from our design desk",
    ),
    inspirationCtaLabel: raw.inspirationCtaLabel ?? "View All Stories",
    testimonialsHeading: toSectionHeading(
      raw.testimonialsHeading,
      "What people say about SolBath",
    ),
    ctaCards: raw.ctaCards.map((c) => ({
      icon: c.icon,
      heading: c.heading,
      description: c.description,
      ctaLabel: c.ctaLabel,
      ctaHref: c.ctaHref,
      variant: c.variant,
    })),
  };
}

const HOME_PAGE_POPULATE =
  "populate[heroVideo][fields][0]=url" +
  "&populate[trustStats]=true" +
  "&populate[personaHeading]=true" +
  "&populate[personas]=true" +
  "&populate[featuredProductsHeading]=true" +
  "&populate[featuredProducts][fields][0]=slug" +
  "&populate[inspirationHeading]=true" +
  "&populate[testimonialsHeading]=true" +
  "&populate[ctaCards]=true";

export async function getHomePage(): Promise<HomePage> {
  const data = await strapiSingle<StrapiHomePage>(
    `/api/home-page?${HOME_PAGE_POPULATE}`,
    ["home-page"],
  );

  if (!data) {
    throw new Error("Strapi returned no Home Page — has the singleton been seeded?");
  }

  return toHomePage(data);
}
