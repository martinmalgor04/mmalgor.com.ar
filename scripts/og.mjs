/**
 * Genera public/og.jpg (1200×630) a partir de build/og-image.html
 * usando el Google Chrome instalado (channel 'chrome'): no descarga navegadores.
 * Los textos salen de src/data/profile.ts.
 *
 *   pnpm og
 */
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = `file://${resolve(root, 'build/og-image.html')}`;
const out = resolve(root, 'public/og.jpg');
const profileSrc = readFileSync(resolve(root, 'src/data/profile.ts'), 'utf8');

function field(key) {
  const match = profileSrc.match(new RegExp(`${key}: '([^']+)'`));
  if (!match) throw new Error(`No encontré ${key} en profile.ts`);
  return match[1];
}

const data = {
  name: field('name'),
  role: field('role'),
  tagline: field('tagline'),
  line: profileSrc.match(/\n\s+line: '([^']+)'/)?.[1] ?? '',
};

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(src, { waitUntil: 'networkidle' });
await page.evaluate((d) => {
  const tagline = d.tagline.replace(
    /decisiones de negocio\./,
    '<span class="highlight">decisiones de negocio.</span>',
  );
  document.querySelector('[data-role]').textContent = d.role;
  document.querySelector('[data-tagline]').innerHTML = tagline;
  document.querySelector('[data-name]').textContent = d.name;
  document.querySelector('[data-line]').textContent = d.line;
}, data);
await page.waitForTimeout(200);
await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
await browser.close();
console.log(`OG image → ${out}`);
