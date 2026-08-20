const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12/13-ish
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto("http://localhost:3000/catalogues", { waitUntil: "networkidle" });

  const viewButton = page.getByRole("button", { name: "View Catalogue" }).first();
  await viewButton.click();

  await page.waitForSelector("text=Catalogue Preview", { timeout: 10000 });
  await page.waitForSelector('img[alt="Page 1"]', { timeout: 15000 });
  await page.waitForTimeout(2000);

  const outDir = path.join(__dirname, "..", "test-screenshots");
  fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, "mobile-before-drag.png") });

  const beforeIndicator = await page.locator("text=/Page \\d+ of \\d+/").textContent();
  console.log("Before drag:", beforeIndicator);

  // Simulate a real touch drag (swipe right-to-left) at the OS/CDP level, the
  // same mechanism a real phone touchscreen would produce.
  await page.evaluate(() => {
    window.__touchLog = [];
    for (const type of ["touchstart", "touchmove", "touchend"]) {
      window.addEventListener(
        type,
        (e) => {
          const t = e.touches[0] || e.changedTouches[0];
          window.__touchLog.push({
            type,
            target: (e.target && (e.target.className || e.target.tagName)) || null,
            x: t && t.clientX,
            y: t && t.clientY,
          });
        },
        true,
      );
    }
  });

  const cdp = await context.newCDPSession(page);
  const box = await page.locator(".relative.shadow-2xl").boundingBox();
  console.log("book bounding box:", box);
  const startX = box.x + box.width - 15;
  const endX = box.x + 20;
  const y = box.y + box.height - 30; // near the bottom-right corner, the classic "grab and flip" hotspot

  const steps = 12;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: startX, y }],
  });
  for (let i = 1; i <= steps; i++) {
    const x = startX + ((endX - startX) * i) / steps;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y }],
    });
    await page.waitForTimeout(30);
  }
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });

  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, "mobile-after-drag.png") });

  const touchLog = await page.evaluate(() => window.__touchLog);
  console.log("touch events received by DOM:", touchLog.length);
  console.log(JSON.stringify(touchLog.slice(0, 3)));
  console.log(JSON.stringify(touchLog.slice(-3)));

  const afterIndicator = await page.locator("text=/Page \\d+ of \\d+/").textContent();
  console.log("After drag:", afterIndicator);
  console.log("Flip via touch drag worked:", beforeIndicator !== afterIndicator);

  await browser.close();

  console.log("Console/page errors captured:", errors.length);
  for (const e of errors) console.log(" -", e);

  if (errors.length > 0 || beforeIndicator === afterIndicator) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
