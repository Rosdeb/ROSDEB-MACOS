import { chromium } from "playwright";

const executablePath = "/opt/pw-browsers/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell";
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

async function shoot(file, width, height, out) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });
  await page.goto(`file://${file}`, { waitUntil: "load" });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.screenshot({ path: out, type: "png", clip: { x: 0, y: 0, width, height } });
  await page.close();
}

await shoot("/workspace/.grok/brand-src/og.html", 1200, 630, "/workspace/.grok/og-raw.png");
await shoot("/workspace/.grok/brand-src/banner.html", 1200, 264, "/workspace/.grok/banner-raw.png");
await shoot("/workspace/.grok/brand-src/favicon-preview.html", 128, 128, "/workspace/.grok/favicon-preview.png");
await browser.close();
console.log("shot");
