import { Category } from "@/lib/types";

export const categories: Category[] = [
  // Bathroom Accessories
  {
    slug: "faucets",
    vertical: "bathroom-accessories",
    name: "Faucets & Taps",
    tagline: "Precision-engineered flow, sculpted for the modern bath.",
    description:
      "Single lever mixers, wall-mounted sets and sensor faucets in a range of designer finishes.",
    filters: [
      { label: "Finish", options: ["Chrome", "Matte Black", "Brushed Gold", "Rose Gold"] },
      { label: "Type", options: ["Single Lever", "Wall Mounted", "Sensor"] },
    ],
  },
  {
    slug: "showers",
    vertical: "bathroom-accessories",
    name: "Showers & Panels",
    tagline: "A rainfall moment, engineered for everyday luxury.",
    description:
      "Overhead showers, hand showers and complete shower panels built for pressure and posture.",
    filters: [
      { label: "Finish", options: ["Chrome", "Matte Black", "Brushed Gold"] },
      { label: "Type", options: ["Rain Shower", "Hand Shower", "Shower Panel"] },
    ],
  },
  {
    slug: "sanitaryware",
    vertical: "bathroom-accessories",
    name: "Sanitaryware",
    tagline: "Sculptural forms in vitreous china, built to last.",
    description: "Wall-hung and floor-mounted WCs, wash basins and bidets.",
    filters: [
      { label: "Type", options: ["Wall-Hung WC", "Floor-Mounted WC", "Wash Basin", "Bidet"] },
      { label: "Finish", options: ["White", "Ivory", "Black Matte"] },
    ],
  },

  // Ceramic Tiles
  {
    slug: "floor-tiles",
    vertical: "ceramic-tiles",
    name: "Floor Tiles",
    tagline: "Underfoot elegance for every room in the house.",
    description: "Vitrified and ceramic floor tiles in glossy, matte and lustre finishes.",
    filters: [
      { label: "Size", options: ["600x600", "600x1200", "800x800"] },
      { label: "Finish", options: ["Glossy", "Matte", "Lustre"] },
    ],
  },
  {
    slug: "wall-tiles",
    vertical: "ceramic-tiles",
    name: "Wall Tiles",
    tagline: "Texture and tone for kitchens, baths and beyond.",
    description: "Decorative and structural wall tiles for interiors and facades.",
    filters: [
      { label: "Size", options: ["300x600", "300x450", "600x600"] },
      { label: "Finish", options: ["Glossy", "Matte", "Metallic"] },
    ],
  },
  {
    slug: "large-format",
    vertical: "ceramic-tiles",
    name: "Large Format Slabs",
    tagline: "Seamless, monolithic surfaces for statement spaces.",
    description: "Large-format porcelain slabs for floors, walls and countertops.",
    filters: [
      { label: "Size", options: ["1200x2400", "1600x3200"] },
      { label: "Finish", options: ["Polished", "Honed"] },
    ],
  },

  // Hardware
  {
    slug: "door-hardware",
    vertical: "hardware",
    name: "Door Hardware",
    tagline: "Every touchpoint, considered.",
    description: "Handles, hinges, locksets and closers for residential and commercial doors.",
    filters: [
      { label: "Type", options: ["Handles", "Hinges", "Locksets", "Closers"] },
      { label: "Finish", options: ["Matte Black", "Antique Brass", "Stainless Steel"] },
    ],
  },
  {
    slug: "cabinet-hardware",
    vertical: "hardware",
    name: "Cabinet & Furniture Hardware",
    tagline: "Small details, disproportionate impact.",
    description: "Handles, knobs, channel profiles and soft-close hinges for cabinetry.",
    filters: [
      { label: "Type", options: ["Handles", "Knobs", "Channel Handles", "Hinges"] },
      { label: "Finish", options: ["Matte Black", "Brushed Brass", "Stainless Steel"] },
    ],
  },
  {
    slug: "locks-security",
    vertical: "hardware",
    name: "Locks & Security",
    tagline: "Security that feels as good as it looks.",
    description: "Mortise locks, digital smart locks and padlocks for every entry point.",
    filters: [
      { label: "Type", options: ["Mortise Lock", "Digital Lock", "Padlock"] },
      { label: "Finish", options: ["Matte Black", "Stainless Steel", "Antique Brass"] },
    ],
  },
];

export const verticalMeta: Record<
  string,
  { name: string; slug: string; tagline: string; tone: "bath" | "tile" | "hardware" }
> = {
  "bathroom-accessories": {
    name: "Bathroom Accessories",
    slug: "bathroom-accessories",
    tagline: "Fittings and fixtures for the modern bath.",
    tone: "bath",
  },
  "ceramic-tiles": {
    name: "Ceramic Tiles",
    slug: "ceramic-tiles",
    tagline: "Surfaces that define a space.",
    tone: "tile",
  },
  hardware: {
    name: "Hardware",
    slug: "hardware",
    tagline: "Considered details for doors, cabinets and more.",
    tone: "hardware",
  },
};

export function getCategoriesByVertical(vertical: string) {
  return categories.filter((c) => c.vertical === vertical);
}

export function getCategory(vertical: string, slug: string) {
  return categories.find((c) => c.vertical === vertical && c.slug === slug);
}
