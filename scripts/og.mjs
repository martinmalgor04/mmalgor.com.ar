/**
 * Genera public/og.png (1200×630) a partir de build/og-image.html
 * usando el Google Chrome instalado (channel 'chrome'): no descarga navegadores.
 *
 *   pnpm og
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = `file://${resolve(root, 'build/og-image.html')}`;
const out = resolve(root, 'public/og.png');

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(src, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(`OG image → ${out}`);
