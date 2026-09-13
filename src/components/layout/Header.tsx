import { getSiteSettings } from "@/lib/data/site";
import { getCategoriesByVertical, getVerticalMeta } from "@/lib/data/categories";
import { getProductsByVertical } from "@/lib/data/products";
import { Vertical } from "@/lib/types";
import { HeaderClient, type MegaMenuVerticalItem } from "./HeaderClient";

// Used only until an editor uploads a real heroImage for the vertical in Strapi.
const FALLBACK_IMAGES: Record<Vertical, { src: string; alt: string }> = {
  "bathroom-accessories": {
    src: "/images/generated/menu-bathroom-accessories.png",
    alt: "Premium bathroom faucet and basin detail",
  },
  "ceramic-tiles": {
    src: "/images/generated/menu-ceramic-tiles.png",
    alt: "Large-format ceramic tile surface detail",
  },
  hardware: {
    src: "/images/generated/menu-hardware.png",
    alt: "Premium brushed metal hardware detail",
  },
  kitchen: {
    src: "/images/generated/menu-kitchen.png",
    alt: "Premium modular kitchen with sink, countertop and cabinet details",
  },
};

export async function Header() {
  const [site, verticalMeta] = await Promise.all([getSiteSettings(), getVerticalMeta()]);

  const mainNav = site.nav.filter((item) => item.href !== "/dealers");
  const verticalSlugs = Object.keys(verticalMeta) as Vertical[];
  const verticalNavItems = mainNav.filter((item) =>
    verticalSlugs.includes(item.href.slice(1) as Vertical),
  );
  const secondaryNav = mainNav.filter((item) => !verticalNavItems.includes(item));

  const megaMenuVerticals: MegaMenuVerticalItem[] = await Promise.all(
    verticalNavItems.map(async (item) => {
      const vertical = item.href.slice(1) as Vertical;
      const meta = verticalMeta[vertical];
      const categories = await getCategoriesByVertical(vertical);

      let popular = meta.popularProducts;
      if (popular.length === 0) {
        const products = await getProductsByVertical(vertical);
        popular = products.filter((p) => p.featured || p.isNew).slice(0, 2);
      }

      return {
        href: item.href,
        vertical,
        name: meta.name,
        tagline: meta.tagline,
        image: meta.image ?? FALLBACK_IMAGES[vertical],
        categories: categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          description: c.description,
        })),
        popular: popular.map((p) => ({ slug: p.slug, name: p.name })),
      };
    }),
  );

  return (
    <HeaderClient
      phone={site.phone}
      megaMenuVerticals={megaMenuVerticals}
      secondaryNav={secondaryNav}
    />
  );
}
