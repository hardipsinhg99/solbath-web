import { HomePage } from "./types";

export const homePage: HomePage = {
  heroEyebrow: "The 2026 Collection",
  heroHeading: "Fittings, surfaces, hardware and kitchens for spaces built to last",
  heroSubheading:
    "Explore SolBath's complete range of bathroom accessories, ceramic tiles, hardware and " +
    "kitchen solutions - curated for architects, dealers and homeowners who want more from " +
    "every surface.",
  heroPrimaryCtaLabel: "Explore the Catalog",
  heroPrimaryCtaHref: "/bathroom-accessories",
  heroSecondaryCtaLabel: "Request a Quote",
  heroSecondaryCtaHref: "/quote",
  trustStats: [
    { icon: "award", label: "15+ Years", detail: "Trusted craftsmanship" },
    { icon: "users", label: "6 Showrooms", detail: "Across Gujarat & Maharashtra" },
    { icon: "shield", label: "Up to 10-Year", detail: "Product warranty" },
    { icon: "truck", label: "Pan-India", detail: "Dealer & project delivery" },
  ],
  personaHeading: {
    eyebrow: "Tailored for you",
    title: "However you build, we have a path for you",
  },
  personas: [
    {
      icon: "home",
      title: "I'm a Homeowner",
      description: "Browse by room, get inspired and request a quote for your renovation.",
      href: "/quote?persona=homeowner",
      ctaLabel: "Start Planning",
    },
    {
      icon: "architect",
      title: "I'm an Architect / Designer",
      description: "Technical specs, downloadable data sheets and project-scale quoting.",
      href: "/for-trade?persona=architect",
      ctaLabel: "View Trade Resources",
    },
    {
      icon: "dealer",
      title: "I'm a Dealer / Contractor",
      description: "Bulk quotes, catalogues and fast turnaround for your next project.",
      href: "/for-trade?persona=dealer",
      ctaLabel: "Partner With Us",
    },
  ],
  featuredProductsHeading: {
    eyebrow: "New & Notable",
    title: "Featured across the collection",
  },
  featuredProductsCtaLabel: "View Kitchen Range",
  featuredProductsCtaHref: "/kitchen",
  inspirationHeading: {
    eyebrow: "Inspiration",
    title: "Ideas for every room, from our design desk",
  },
  inspirationCtaLabel: "View All Stories",
  testimonialsHeading: {
    eyebrow: "Trusted by homeowners & trade partners",
    title: "What people say about SolBath",
  },
  ctaCards: [
    {
      icon: "map-pin",
      heading: "Visit a showroom near you",
      description:
        "See finishes, textures and full room setups in person at one of our partner " +
        "showrooms across Gujarat and Maharashtra.",
      ctaLabel: "Find a Dealer",
      ctaHref: "/dealers",
      variant: "light",
    },
    {
      icon: "download",
      heading: "Download our catalogues",
      description:
        "Get the full product range, specs and finishes in one PDF — organized by category " +
        "for faster specification.",
      ctaLabel: "Browse Catalogues",
      ctaHref: "/catalogues",
      variant: "dark",
    },
  ],
};
