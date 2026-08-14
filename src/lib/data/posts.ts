import { InspirationPost } from "@/lib/types";

export const posts: InspirationPost[] = [
  {
    slug: "modern-luxury-master-bath",
    title: "Designing a Modern Luxury Master Bath",
    room: "Bathroom",
    excerpt:
      "How to combine matte black fittings, large-format slabs and warm brass accents for a spa-like master bath.",
    readTime: "4 min read",
    tone: "bath",
    relatedProductSlugs: [
      "monsoon-overhead-rain-shower",
      "form-wall-hung-wc",
      "statuario-polished-slab",
    ],
  },
  {
    slug: "warm-minimalist-kitchen",
    title: "Warm Minimalist Kitchens with Wood-Look Tiles",
    room: "Kitchen",
    excerpt:
      "Pairing wood-look floor tiles with handle-less cabinetry and channel pulls for a calm, warm kitchen.",
    readTime: "3 min read",
    tone: "tile",
    relatedProductSlugs: ["nordic-oak-matte-floor-tile", "channel-pull-cabinet-handle"],
  },
  {
    slug: "choosing-the-right-door-hardware",
    title: "A Buyer's Guide to Choosing Door Hardware",
    room: "Guide",
    excerpt:
      "Lever vs. knob, finishes that age well, and how to match hardware across a whole home.",
    readTime: "6 min read",
    tone: "hardware",
    relatedProductSlugs: ["helix-lever-door-handle", "vault-mortise-lockset"],
  },
  {
    slug: "outdoor-spaces-large-format-slabs",
    title: "Elevating Outdoor Spaces with Large Format Slabs",
    room: "Outdoor",
    excerpt:
      "Seamless slabs are moving outdoors — here's how to specify them for patios and pool decks.",
    readTime: "5 min read",
    tone: "tile",
    relatedProductSlugs: ["basalt-honed-slab", "travertino-polished-slab"],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
