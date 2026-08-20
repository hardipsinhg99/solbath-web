import { Catalog } from "@/lib/types";

// fileUrl points at a shared sample PDF for now — real per-catalogue PDFs will be
// uploaded and managed through the CMS, each with its own file.
const SAMPLE_PDF = "/catalogs/sample-catalog.pdf";

export const catalogs: Catalog[] = [
  {
    id: "c1",
    title: "Bathroom Accessories — Full Catalogue 2026",
    vertical: "bathroom-accessories",
    fileSize: "18.2 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c2",
    title: "Faucets & Showers Lookbook",
    vertical: "bathroom-accessories",
    fileSize: "9.4 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c3",
    title: "Ceramic Tiles — Full Catalogue 2026",
    vertical: "ceramic-tiles",
    fileSize: "24.6 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c4",
    title: "Large Format Slabs Technical Guide",
    vertical: "ceramic-tiles",
    fileSize: "6.1 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c5",
    title: "Hardware — Full Catalogue 2026",
    vertical: "hardware",
    fileSize: "12.8 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c6",
    title: "Door & Cabinet Hardware Price List",
    vertical: "hardware",
    fileSize: "2.3 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c7",
    title: "Kitchen - Full Catalogue 2026",
    vertical: "kitchen",
    fileSize: "15.4 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c8",
    title: "Kitchen Sinks, Surfaces & Storage Guide",
    vertical: "kitchen",
    fileSize: "7.8 MB",
    fileUrl: SAMPLE_PDF,
  },
  {
    id: "c9",
    title: "SolBath Brand Book & Company Profile",
    vertical: "all",
    fileSize: "4.7 MB",
    fileUrl: SAMPLE_PDF,
  },
];
