export const site = {
  name: "SolBath",
  tagline: "Bathroom Accessories · Ceramic Tiles · Hardware",
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
    { label: "Inspiration", href: "/inspiration" },
    { label: "For Trade", href: "/for-trade" },
    { label: "Find a Dealer", href: "/dealers" },
  ],
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
