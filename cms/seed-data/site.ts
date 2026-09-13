export const site = {
  name: "SolBath",
  tagline: "Bathroom Accessories - Ceramic Tiles - Hardware - Kitchen",
  whatsappNumber: "919876543210",
  phone: "+91 98765 43210",
  email: "hello@solbath.example",
  address: "SG Highway, Ahmedabad, Gujarat 380015, India",
  social: {
    instagram: "#",
    facebook: "#",
    pinterest: "#",
    youtube: "#",
  },
  nav: [
    { label: "Bathroom Accessories", href: "/bathroom-accessories" },
    { label: "Ceramic Tiles", href: "/ceramic-tiles" },
    { label: "Hardware", href: "/hardware" },
    { label: "Kitchen", href: "/kitchen" },
    { label: "Inspiration", href: "/inspiration" },
    { label: "For Trade", href: "/for-trade" },
    { label: "Find a Dealer", href: "/dealers" },
  ],
  footerTagline:
    "Bathroom accessories, ceramic tiles, hardware and kitchen solutions for homes and " +
    "projects that expect more from every surface and fitting.",
  footerColumns: [
    {
      title: "Shop",
      links: [
        { label: "Bathroom Accessories", href: "/bathroom-accessories" },
        { label: "Ceramic Tiles", href: "/ceramic-tiles" },
        { label: "Hardware", href: "/hardware" },
        { label: "Kitchen", href: "/kitchen" },
        { label: "Inspiration", href: "/inspiration" },
      ],
    },
    {
      title: "For You",
      links: [
        { label: "Request a Quote", href: "/quote" },
        { label: "My Selection", href: "/selection" },
        { label: "Find a Dealer", href: "/dealers" },
        { label: "Download Catalogues", href: "/catalogues" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About SolBath", href: "/about" },
        { label: "For Architects & Dealers", href: "/for-trade" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
  ],
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
