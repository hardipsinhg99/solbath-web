const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

const NAVY = rgb(14 / 255, 44 / 255, 78 / 255);
const ACCENT = rgb(30 / 255, 111 / 255, 217 / 255);
const INK = rgb(16 / 255, 25 / 255, 43 / 255);
const INK_SOFT = rgb(85 / 255, 99 / 255, 106 / 255);
const WHITE = rgb(1, 1, 1);
const STONE = rgb(239 / 255, 244 / 255, 250 / 255);

const SECTIONS = [
  {
    title: "Faucets & Taps",
    products: [
      ["Aura Single Lever Basin Mixer", "Solid Brass · 35mm Ceramic Disc · 10 Yr Warranty"],
      ["Linea Wall-Mounted Basin Mixer", "Solid Brass · Concealed Body · 10 Yr Warranty"],
      ["Pure Touch Sensor Faucet", "Infrared Sensor · Auto Shut-off · 5 Yr Warranty"],
    ],
  },
  {
    title: "Showers & Panels",
    products: [
      ["Monsoon Overhead Rain Shower", "8mm Profile · Anti-limescale Nozzles · 10 Yr Warranty"],
      ["Cascade Multi-Function Shower Panel", "Thermostatic Valve · 4x Body Jets · 7 Yr Warranty"],
      ["Drift Handheld Shower", "3 Functions · 1.5m Hose · 5 Yr Warranty"],
    ],
  },
  {
    title: "Ceramic Tiles",
    products: [
      ["Calacatta Glossy Floor Tile", "Vitrified Porcelain · PEI IV · 600x1200"],
      ["Nordic Oak Matte Floor Tile", "Anti-skid Matte · PEI III · 800x800"],
      ["Statuario Polished Slab", "Full-Body Porcelain · 9mm · 1200x2400"],
    ],
  },
  {
    title: "Hardware",
    products: [
      ["Helix Lever Door Handle", "Solid Brass Core · 60/70mm Backset · 5 Yr Warranty"],
      ["Nova Digital Smart Lock", "PIN / Card / App · Mechanical Override · 3 Yr Warranty"],
      ["Orbit Cabinet Knob", "Zinc Alloy · 32mm Diameter"],
    ],
  },
];

async function main() {
  const pdf = await PDFDocument.create();
  const heading = await pdf.embedFont(StandardFonts.HelveticaBold);
  const body = await pdf.embedFont(StandardFonts.Helvetica);

  const PAGE_W = 595.28; // A4
  const PAGE_H = 841.89;

  // Cover page
  {
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: NAVY });
    page.drawRectangle({ x: 0, y: PAGE_H - 6, width: PAGE_W, height: 6, color: ACCENT });
    page.drawText("SOLBATH", {
      x: 60,
      y: PAGE_H - 220,
      size: 46,
      font: heading,
      color: WHITE,
    });
    page.drawText("GLOBAL PRIVATE LIMITED", {
      x: 60,
      y: PAGE_H - 250,
      size: 12,
      font: body,
      color: rgb(0.7, 0.8, 0.92),
    });
    page.drawText("2026 Collection Catalogue", {
      x: 60,
      y: PAGE_H - 300,
      size: 20,
      font: body,
      color: WHITE,
    });
    page.drawText("Bathroom Accessories · Ceramic Tiles · Hardware", {
      x: 60,
      y: PAGE_H - 326,
      size: 12,
      font: body,
      color: rgb(0.7, 0.8, 0.92),
    });
    page.drawText("Sample preview — real catalogue PDFs are managed through the CMS.", {
      x: 60,
      y: 60,
      size: 9,
      font: body,
      color: rgb(0.55, 0.65, 0.78),
    });
  }

  // Section pages
  for (const section of SECTIONS) {
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: WHITE });
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 90, color: NAVY });
    page.drawText(section.title, {
      x: 50,
      y: 40,
      size: 26,
      font: heading,
      color: WHITE,
    });

    let y = PAGE_H - 150;
    for (const [name, spec] of section.products) {
      page.drawRectangle({ x: 50, y: y - 70, width: PAGE_W - 100, height: 90, color: STONE });
      page.drawRectangle({ x: 50, y: y - 70, width: 6, height: 90, color: ACCENT });
      page.drawText(name, { x: 74, y: y - 8, size: 15, font: heading, color: INK });
      page.drawText(spec, { x: 74, y: y - 30, size: 10.5, font: body, color: INK_SOFT });
      y -= 120;
    }

    page.drawText("www.solbath.example  ·  hello@solbath.example", {
      x: 50,
      y: 30,
      size: 9,
      font: body,
      color: INK_SOFT,
    });
  }

  // Closing page
  {
    const page = pdf.addPage([PAGE_W, PAGE_H]);
    page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: NAVY });
    page.drawText("Thank you.", {
      x: 60,
      y: PAGE_H / 2,
      size: 30,
      font: heading,
      color: WHITE,
    });
    page.drawText("Request a formal quote at solbath.example/quote", {
      x: 60,
      y: PAGE_H / 2 - 30,
      size: 12,
      font: body,
      color: rgb(0.7, 0.8, 0.92),
    });
  }

  const bytes = await pdf.save();
  const outDir = path.join(__dirname, "..", "public", "catalogs");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "sample-catalog.pdf");
  fs.writeFileSync(outPath, bytes);
  console.log("Wrote", outPath, `(${(bytes.length / 1024).toFixed(1)} KB, ${SECTIONS.length + 2} pages)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
