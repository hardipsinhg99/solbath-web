import { strapiSingle } from "@/lib/cms/client";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteSettings {
  name: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  social: {
    instagram?: string;
    facebook?: string;
    pinterest?: string;
    youtube?: string;
  };
  nav: { label: string; href: string }[];
  footerTagline: string;
  footerColumns: FooterColumn[];
}

interface StrapiSiteSettings {
  name: string;
  tagline: string | null;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string | null;
  social: SiteSettings["social"] | null;
  nav: { label: string; href: string }[];
  footerTagline: string | null;
  footerColumns: FooterColumn[];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await strapiSingle<StrapiSiteSettings>(
    "/api/site-setting?populate[social]=true&populate[nav]=true&populate[footerColumns][populate]=links",
    ["site-settings"],
  );

  if (!data) {
    throw new Error("Strapi returned no Site Settings — has the singleton been seeded?");
  }

  return {
    name: data.name,
    tagline: data.tagline ?? "",
    whatsappNumber: data.whatsappNumber,
    phone: data.phone,
    email: data.email,
    address: data.address ?? "",
    social: data.social ?? {},
    nav: data.nav,
    footerTagline: data.footerTagline ?? "",
    footerColumns: data.footerColumns ?? [],
  };
}

export function whatsappLink(message: string, whatsappNumber: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
