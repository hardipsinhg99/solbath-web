import { Product } from "./types";

export const products: Product[] = [
  // ---------- Faucets ----------
  {
    slug: "aura-single-lever-basin-mixer",
    vertical: "bathroom-accessories",
    categorySlug: "faucets",
    name: "Aura Single Lever Basin Mixer",
    collection: "Aura Collection",
    shortDescription: "A sculpted single-lever mixer with a ceramic disc cartridge.",
    description:
      "The Aura Single Lever Basin Mixer pairs a sculpted, architectural silhouette with a smooth 35mm ceramic disc cartridge for drip-free, precise temperature control. Designed for modern and transitional bathrooms alike.",
    finishes: ["Chrome", "Matte Black", "Brushed Gold"],
    specs: [
      { label: "Body Material", value: "Solid Brass" },
      { label: "Cartridge", value: "35mm Ceramic Disc" },
      { label: "Flow Rate", value: "6 L/min (aerated)" },
      { label: "Installation", value: "Deck Mounted, Single Hole" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "bath",
  },
  {
    slug: "linea-wall-mounted-mixer",
    vertical: "bathroom-accessories",
    categorySlug: "faucets",
    name: "Linea Wall-Mounted Basin Mixer",
    collection: "Linea Collection",
    shortDescription: "Clean horizontal lines for a floating-basin look.",
    description:
      "A concealed wall-mounted mixer that keeps the counter free of clutter, finished with a slender spout for a minimal, floating aesthetic.",
    finishes: ["Chrome", "Matte Black"],
    specs: [
      { label: "Body Material", value: "Solid Brass" },
      { label: "Installation", value: "Wall Mounted (concealed body required)" },
      { label: "Spout Reach", value: "180mm" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "bath",
  },
  {
    slug: "pure-touch-sensor-faucet",
    vertical: "bathroom-accessories",
    categorySlug: "faucets",
    name: "Pure Touch Sensor Faucet",
    collection: "Pure Collection",
    shortDescription: "Infrared sensor faucet for touch-free hygiene.",
    description:
      "An infrared sensor-activated faucet designed for hygiene-conscious homes and commercial washrooms, with an adjustable auto shut-off and battery or mains power options.",
    finishes: ["Chrome", "Brushed Gold"],
    specs: [
      { label: "Sensor Range", value: "0–12cm, adjustable" },
      { label: "Power", value: "4xAA battery or DC adaptor" },
      { label: "Auto Shut-off", value: "Yes, 25s default" },
      { label: "Warranty", value: "5 Years" },
    ],
    tags: [],
    tone: "bath",
  },

  // ---------- Showers ----------
  {
    slug: "monsoon-overhead-rain-shower",
    vertical: "bathroom-accessories",
    categorySlug: "showers",
    name: "Monsoon Overhead Rain Shower",
    collection: "Monsoon Collection",
    shortDescription: "300mm ultra-thin rain shower for a full-body cascade.",
    description:
      "An ultra-thin 8mm profile rain shower head engineered with anti-limescale silicone nozzles for a consistent, full-coverage cascade.",
    finishes: ["Chrome", "Matte Black", "Brushed Gold"],
    sizes: ["200mm", "300mm", "400mm"],
    specs: [
      { label: "Profile Thickness", value: "8mm" },
      { label: "Nozzle Type", value: "Anti-limescale Silicone" },
      { label: "Water Pressure", value: "1–5 bar" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "bath",
  },
  {
    slug: "cascade-shower-panel",
    vertical: "bathroom-accessories",
    categorySlug: "showers",
    name: "Cascade Multi-Function Shower Panel",
    collection: "Cascade Collection",
    shortDescription: "Integrated body jets, hand shower and overhead in one panel.",
    description:
      "A wall-mounted panel integrating an overhead rain shower, adjustable body jets and a hand shower, with a thermostatic mixing valve for stable temperature control.",
    finishes: ["Stainless Steel", "Matte Black"],
    specs: [
      { label: "Body Jets", value: "4x adjustable" },
      { label: "Valve Type", value: "Thermostatic" },
      { label: "Installation", value: "Exposed wall mount" },
      { label: "Warranty", value: "7 Years" },
    ],
    tags: [],
    tone: "bath",
  },
  {
    slug: "drift-handheld-shower",
    vertical: "bathroom-accessories",
    categorySlug: "showers",
    name: "Drift Handheld Shower",
    collection: "Drift Collection",
    shortDescription: "Three-function handheld shower with a comfort grip.",
    description:
      "A three-function handheld shower — rain, massage and mist — with an ergonomic grip and a click-lock hose connector for easy maintenance.",
    finishes: ["Chrome", "Matte Black"],
    specs: [
      { label: "Functions", value: "Rain / Massage / Mist" },
      { label: "Hose Length", value: "1.5m" },
      { label: "Warranty", value: "5 Years" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "bath",
  },

  // ---------- Sanitaryware ----------
  {
    slug: "form-wall-hung-wc",
    vertical: "bathroom-accessories",
    categorySlug: "sanitaryware",
    name: "Form Wall-Hung Water Closet",
    collection: "Form Collection",
    shortDescription: "Rimless flushing technology in a sculpted silhouette.",
    description:
      "A wall-hung WC with rimless flushing technology for easier cleaning and quieter operation, paired with a slim seat cover in soft-close hinges.",
    finishes: ["White", "Ivory"],
    specs: [
      { label: "Flush Type", value: "Rimless, Dual Flush (3/6L)" },
      { label: "Seat", value: "Soft-close, Quick-release" },
      { label: "Trap", value: "P-Trap / S-Trap (specify)" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "bath",
  },
  {
    slug: "oval-counter-basin",
    vertical: "bathroom-accessories",
    categorySlug: "sanitaryware",
    name: "Oval Countertop Wash Basin",
    collection: "Oval Collection",
    shortDescription: "A sculptural above-counter basin in vitreous china.",
    description:
      "An above-counter oval basin finished in high-gloss vitreous china with a fully glazed underside for a seamless, easy-to-clean finish.",
    finishes: ["White", "Black Matte"],
    sizes: ["500mm", "600mm"],
    specs: [
      { label: "Material", value: "Vitreous China" },
      { label: "Installation", value: "Countertop / Vessel" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: [],
    tone: "bath",
  },
  {
    slug: "serene-floor-mounted-wc",
    vertical: "bathroom-accessories",
    categorySlug: "sanitaryware",
    name: "Serene Floor-Mounted WC",
    collection: "Serene Collection",
    shortDescription: "A classic floor-mounted suite with a comfort-height seat.",
    description:
      "A floor-mounted, close-coupled WC suite with a comfort-height seat and a dual-flush cistern for efficient water use.",
    finishes: ["White", "Ivory", "Black Matte"],
    specs: [
      { label: "Flush Type", value: "Dual Flush (3/6L)" },
      { label: "Seat Height", value: "Comfort Height (420mm)" },
      { label: "Warranty", value: "10 Years" },
    ],
    tags: [],
    tone: "bath",
  },

  // ---------- Floor Tiles ----------
  {
    slug: "calacatta-glossy-floor-tile",
    vertical: "ceramic-tiles",
    categorySlug: "floor-tiles",
    name: "Calacatta Glossy Floor Tile",
    collection: "Marble Edit",
    shortDescription: "Marble-look porcelain with dramatic gold veining.",
    description:
      "A high-gloss porcelain floor tile that replicates the dramatic veining of Calacatta marble, digitally printed for consistent pattern repeatability across large areas.",
    finishes: ["Glossy"],
    sizes: ["600x600", "600x1200"],
    specs: [
      { label: "Material", value: "Vitrified Porcelain" },
      { label: "PEI Rating", value: "IV (Heavy Traffic)" },
      { label: "Water Absorption", value: "<0.5%" },
      { label: "Finish", value: "High Gloss" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "tile",
  },
  {
    slug: "nordic-oak-matte-floor-tile",
    vertical: "ceramic-tiles",
    categorySlug: "floor-tiles",
    name: "Nordic Oak Matte Floor Tile",
    collection: "Woodgrain Edit",
    shortDescription: "Wood-look tile with a soft matte, anti-skid finish.",
    description:
      "A wood-look vitrified tile with an authentic grain texture and an anti-skid matte finish, suited to living areas, bedrooms and commercial interiors.",
    finishes: ["Matte"],
    sizes: ["600x600", "800x800"],
    specs: [
      { label: "Material", value: "Vitrified Porcelain" },
      { label: "PEI Rating", value: "III (Medium-Heavy Traffic)" },
      { label: "Slip Resistance", value: "R10" },
    ],
    tags: [],
    tone: "tile",
  },
  {
    slug: "graphite-lustre-floor-tile",
    vertical: "ceramic-tiles",
    categorySlug: "floor-tiles",
    name: "Graphite Lustre Floor Tile",
    collection: "Concrete Edit",
    shortDescription: "Concrete-inspired tile with a soft satin sheen.",
    description:
      "A concrete-look floor tile in a soft satin lustre, offering an understated industrial aesthetic for contemporary interiors.",
    finishes: ["Lustre"],
    sizes: ["600x600", "600x1200"],
    specs: [
      { label: "Material", value: "Vitrified Porcelain" },
      { label: "PEI Rating", value: "IV (Heavy Traffic)" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "tile",
  },

  // ---------- Wall Tiles ----------
  {
    slug: "carrara-glossy-wall-tile",
    vertical: "ceramic-tiles",
    categorySlug: "wall-tiles",
    name: "Carrara Glossy Wall Tile",
    collection: "Marble Edit",
    shortDescription: "Elegant Carrara-look tile for kitchens and baths.",
    description:
      "A high-gloss ceramic wall tile with fine grey veining reminiscent of Carrara marble — ideal for kitchen backsplashes and bathroom walls.",
    finishes: ["Glossy"],
    sizes: ["300x600", "300x450"],
    specs: [
      { label: "Material", value: "Ceramic" },
      { label: "Water Absorption", value: ">10% (wall use only)" },
    ],
    tags: [],
    tone: "tile",
  },
  {
    slug: "terra-metallic-accent-tile",
    vertical: "ceramic-tiles",
    categorySlug: "wall-tiles",
    name: "Terra Metallic Accent Tile",
    collection: "Décor Edit",
    shortDescription: "A statement accent tile with a subtle metallic shimmer.",
    description:
      "A décor accent tile with a warm metallic shimmer, designed to be used as a feature strip or focal wall alongside plain field tiles.",
    finishes: ["Metallic"],
    sizes: ["300x600"],
    specs: [
      { label: "Material", value: "Ceramic" },
      { label: "Usage", value: "Feature Wall / Accent Strip" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "tile",
  },
  {
    slug: "quartz-matte-wall-tile",
    vertical: "ceramic-tiles",
    categorySlug: "wall-tiles",
    name: "Quartz Matte Wall Tile",
    collection: "Stone Edit",
    shortDescription: "A quiet, stone-textured matte tile for calm interiors.",
    description:
      "A softly textured, stone-look matte wall tile designed to bring a calm, tactile backdrop to bathrooms and feature walls.",
    finishes: ["Matte"],
    sizes: ["300x600", "600x600"],
    specs: [
      { label: "Material", value: "Ceramic" },
      { label: "Finish", value: "Matte, Textured" },
    ],
    tags: [],
    tone: "tile",
  },

  // ---------- Large Format ----------
  {
    slug: "statuario-polished-slab",
    vertical: "ceramic-tiles",
    categorySlug: "large-format",
    name: "Statuario Polished Slab",
    collection: "Slab Edit",
    shortDescription: "Book-matched marble-look slabs for seamless walls and floors.",
    description:
      "A large-format porcelain slab with book-matched veining for a seamless, joint-free look across expansive floors, walls and countertops.",
    finishes: ["Polished"],
    sizes: ["1200x2400"],
    specs: [
      { label: "Material", value: "Full-Body Porcelain" },
      { label: "Thickness", value: "9mm" },
      { label: "Application", value: "Floor / Wall / Countertop" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "tile",
  },
  {
    slug: "basalt-honed-slab",
    vertical: "ceramic-tiles",
    categorySlug: "large-format",
    name: "Basalt Honed Slab",
    collection: "Slab Edit",
    shortDescription: "A monolithic honed slab in deep volcanic tones.",
    description:
      "A honed, low-sheen large format slab in deep basalt tones, suited to feature floors and minimalist facades.",
    finishes: ["Honed"],
    sizes: ["1600x3200"],
    specs: [
      { label: "Material", value: "Full-Body Porcelain" },
      { label: "Thickness", value: "12mm" },
    ],
    tags: [],
    tone: "tile",
  },
  {
    slug: "travertino-polished-slab",
    vertical: "ceramic-tiles",
    categorySlug: "large-format",
    name: "Travertino Polished Slab",
    collection: "Slab Edit",
    shortDescription: "Warm travertine tones in a seamless large format.",
    description:
      "A warm-toned travertine-look slab, polished to a soft sheen, ideal for lobby floors and feature walls that need scale and presence.",
    finishes: ["Polished"],
    sizes: ["1200x2400"],
    specs: [
      { label: "Material", value: "Full-Body Porcelain" },
      { label: "Thickness", value: "9mm" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "tile",
  },

  // ---------- Door Hardware ----------
  {
    slug: "helix-lever-door-handle",
    vertical: "hardware",
    categorySlug: "door-hardware",
    name: "Helix Lever Door Handle",
    collection: "Helix Collection",
    shortDescription: "A sculpted lever handle with a solid brass core.",
    description:
      "A sculpted lever door handle machined from a solid brass core, designed for smooth, quiet operation and a comfortable grip.",
    finishes: ["Matte Black", "Antique Brass", "Stainless Steel"],
    specs: [
      { label: "Core Material", value: "Solid Brass" },
      { label: "Spindle", value: "8mm Square" },
      { label: "Backset", value: "60mm / 70mm" },
      { label: "Warranty", value: "5 Years" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "hardware",
  },
  {
    slug: "silent-close-door-hinge",
    vertical: "hardware",
    categorySlug: "door-hardware",
    name: "Silent-Close Door Hinge",
    collection: "Motion Collection",
    shortDescription: "A ball-bearing hinge engineered for silent operation.",
    description:
      "A precision ball-bearing hinge engineered to eliminate squeak and sag over years of use, rated for heavy residential and light commercial doors.",
    finishes: ["Stainless Steel", "Matte Black"],
    specs: [
      { label: "Bearing Type", value: "Ball Bearing" },
      { label: "Load Rating", value: "Up to 60kg per pair" },
      { label: "Size", value: "4in x 3in" },
    ],
    tags: [],
    tone: "hardware",
  },
  {
    slug: "vault-mortise-lockset",
    vertical: "hardware",
    categorySlug: "door-hardware",
    name: "Vault Mortise Lockset",
    collection: "Vault Collection",
    shortDescription: "A 5-lever mortise lockset with a matching handle set.",
    description:
      "A robust 5-lever mortise lockset paired with a matching lever handle set, designed for main entry doors requiring higher security.",
    finishes: ["Matte Black", "Stainless Steel"],
    specs: [
      { label: "Lever Count", value: "5 Lever" },
      { label: "Key Type", value: "3 Keys Included" },
      { label: "Warranty", value: "7 Years" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "hardware",
  },

  // ---------- Cabinet Hardware ----------
  {
    slug: "channel-pull-cabinet-handle",
    vertical: "hardware",
    categorySlug: "cabinet-hardware",
    name: "Channel Pull Cabinet Handle",
    collection: "Line Collection",
    shortDescription: "A continuous aluminium channel profile for edge-pull cabinets.",
    description:
      "A continuous channel-pull profile designed for handle-less kitchen and wardrobe cabinetry, sold per running metre and cut to size.",
    finishes: ["Matte Black", "Stainless Steel"],
    specs: [
      { label: "Material", value: "Anodized Aluminium" },
      { label: "Supply Format", value: "Per running metre, cut to size" },
    ],
    tags: [],
    tone: "hardware",
  },
  {
    slug: "orbit-cabinet-knob",
    vertical: "hardware",
    categorySlug: "cabinet-hardware",
    name: "Orbit Cabinet Knob",
    collection: "Orbit Collection",
    shortDescription: "A compact spherical knob in brushed brass.",
    description:
      "A compact, spherical cabinet knob finished in brushed brass — a versatile detail for kitchen, wardrobe and furniture fronts.",
    finishes: ["Brushed Brass", "Matte Black"],
    specs: [
      { label: "Material", value: "Zinc Alloy" },
      { label: "Diameter", value: "32mm" },
    ],
    tags: ["Bestseller"],
    featured: true,
    tone: "hardware",
  },
  {
    slug: "flex-soft-close-hinge",
    vertical: "hardware",
    categorySlug: "cabinet-hardware",
    name: "Flex Soft-Close Cabinet Hinge",
    collection: "Flex Collection",
    shortDescription: "A soft-close concealed hinge for cabinet doors.",
    description:
      "A concealed, soft-close cabinet hinge with an integrated damper for quiet, controlled door closing across kitchen and wardrobe applications.",
    finishes: ["Nickel Plated"],
    specs: [
      { label: "Opening Angle", value: "110°" },
      { label: "Mounting", value: "Concealed, Cup-and-Plate" },
    ],
    tags: [],
    tone: "hardware",
  },

  // ---------- Locks & Security ----------
  {
    slug: "nova-digital-smart-lock",
    vertical: "hardware",
    categorySlug: "locks-security",
    name: "Nova Digital Smart Lock",
    collection: "Nova Collection",
    shortDescription: "PIN, card and app-based access in one slim lockset.",
    description:
      "A digital smart lock supporting PIN, RFID card and app-based access with a mechanical key override, designed for main doors and apartments.",
    finishes: ["Matte Black", "Stainless Steel"],
    specs: [
      { label: "Access Modes", value: "PIN / Card / App / Mechanical Key" },
      { label: "Power", value: "4xAA Battery (low-battery alert)" },
      { label: "Warranty", value: "3 Years" },
    ],
    tags: ["New"],
    isNew: true,
    tone: "hardware",
  },
  {
    slug: "citadel-mortise-lock",
    vertical: "hardware",
    categorySlug: "locks-security",
    name: "Citadel Mortise Lock",
    collection: "Citadel Collection",
    shortDescription: "A heavy-duty mortise lock for main entrances.",
    description:
      "A heavy-duty mortise lock body built for main entrances and high-traffic doors, offering reinforced strike engagement for added security.",
    finishes: ["Stainless Steel"],
    specs: [
      { label: "Lever Count", value: "5 Lever" },
      { label: "Strike Type", value: "Reinforced" },
    ],
    tags: [],
    tone: "hardware",
  },
  {
    slug: "guard-brass-padlock",
    vertical: "hardware",
    categorySlug: "locks-security",
    name: "Guard Solid Brass Padlock",
    collection: "Guard Collection",
    shortDescription: "A weatherproof solid brass padlock.",
    description:
      "A solid brass padlock with a hardened steel shackle and weatherproof internals, suited to gates, storage and outdoor applications.",
    finishes: ["Brass", "Matte Black"],
    sizes: ["40mm", "50mm", "63mm"],
    specs: [
      { label: "Material", value: "Solid Brass Body" },
      { label: "Shackle", value: "Hardened Steel" },
    ],
    tags: [],
    tone: "hardware",
  },
];

export function getProductsByCategory(vertical: string, categorySlug: string) {
  return products.filter((p) => p.vertical === vertical && p.categorySlug === categorySlug);
}

export function getProductsByVertical(vertical: string) {
  return products.filter((p) => p.vertical === vertical);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.slug !== product.slug && p.categorySlug === product.categorySlug)
    .slice(0, count);
}
