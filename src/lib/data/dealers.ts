import { Dealer } from "@/lib/types";

export const dealers: Dealer[] = [
  {
    id: "d1",
    name: "SolBath Experience Studio",
    city: "Ahmedabad",
    state: "Gujarat",
    address: "SG Highway, Ahmedabad, Gujarat 380015",
    phone: "+91 98765 43210",
    rating: 4.8,
    categories: ["bathroom-accessories", "ceramic-tiles", "hardware"],
  },
  {
    id: "d2",
    name: "Prestige Sanitation & Tiles",
    city: "Surat",
    state: "Gujarat",
    address: "Ring Road, Surat, Gujarat 395002",
    phone: "+91 98765 11223",
    rating: 4.6,
    categories: ["bathroom-accessories", "ceramic-tiles"],
  },
  {
    id: "d3",
    name: "Metro Hardware House",
    city: "Vadodara",
    state: "Gujarat",
    address: "Alkapuri, Vadodara, Gujarat 390007",
    phone: "+91 98765 33445",
    rating: 4.5,
    categories: ["hardware"],
  },
  {
    id: "d4",
    name: "Urban Bath Gallery",
    city: "Mumbai",
    state: "Maharashtra",
    address: "Andheri West, Mumbai, Maharashtra 400058",
    phone: "+91 98765 55667",
    rating: 4.7,
    categories: ["bathroom-accessories", "ceramic-tiles", "hardware"],
  },
  {
    id: "d5",
    name: "Capstone Tiles Emporium",
    city: "Pune",
    state: "Maharashtra",
    address: "Baner Road, Pune, Maharashtra 411045",
    phone: "+91 98765 77889",
    rating: 4.4,
    categories: ["ceramic-tiles"],
  },
  {
    id: "d6",
    name: "Regal Fittings Co.",
    city: "Rajkot",
    state: "Gujarat",
    address: "150 Feet Ring Road, Rajkot, Gujarat 360005",
    phone: "+91 98765 99001",
    rating: 4.6,
    categories: ["bathroom-accessories", "hardware"],
  },
];

export function getDealersByCity(city?: string) {
  if (!city) return dealers;
  return dealers.filter((d) => d.city.toLowerCase() === city.toLowerCase());
}

export const dealerCities = Array.from(new Set(dealers.map((d) => d.city))).sort();
