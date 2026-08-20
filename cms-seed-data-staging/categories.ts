export const categories = [
  {
    slug: "kitchen-faucets-sinks",
    verticalSlug: "kitchen",
    name: "Kitchen Faucets & Sinks",
    tagline: "Hard-working water zones with a polished, architectural presence.",
    description:
      "Pull-out mixers, workstation sinks and undermount bowls designed for daily prep, rinse and clean-up.",
    filters: [
      { label: "Type", options: ["Pull-Out Mixer", "Undermount Sink", "Workstation Sink"] },
      { label: "Finish", options: ["Chrome", "Brushed Steel", "Matte Black", "Gunmetal"] },
    ],
    sortOrder: 10,
    isActive: true,
  },
  {
    slug: "kitchen-surfaces-backsplashes",
    verticalSlug: "kitchen",
    name: "Surfaces & Backsplashes",
    tagline: "Countertops and backsplashes that make the kitchen feel composed.",
    description:
      "Porcelain slabs, backsplash tiles and stone-look surfaces for durable, easy-clean kitchens.",
    filters: [
      { label: "Application", options: ["Countertop", "Backsplash", "Wall Cladding"] },
      { label: "Finish", options: ["Polished", "Matte", "Textured", "Glossy"] },
    ],
    sortOrder: 20,
    isActive: true,
  },
  {
    slug: "kitchen-storage-hardware",
    verticalSlug: "kitchen",
    name: "Storage & Cabinet Hardware",
    tagline: "Quiet motion, smart access and clean cabinetry details.",
    description:
      "Drawer systems, pantry pull-outs, corner units and cabinet hardware for efficient modular kitchens.",
    filters: [
      { label: "Type", options: ["Drawer System", "Pantry Pull-Out", "Corner Unit", "Handle Profile"] },
      { label: "Finish", options: ["Matte Black", "Brushed Brass", "Stainless Steel", "Graphite"] },
    ],
    sortOrder: 30,
    isActive: true,
  },
];
