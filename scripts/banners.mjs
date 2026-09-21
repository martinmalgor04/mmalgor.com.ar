/**
 * Genera los banners de redes a partir de build/banner-*.html usando el
 * Google Chrome instalado. Los textos salen de src/data/profile.ts.
 *
 *   pnpm banners
 *
 *   build/banners/linkedin.png  1584×396   (medida oficial de LinkedIn)
 *   build/banners/facebook.png  1640×624   (820×312 a 2x; Facebook lo escala)
 */
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'build/banners');
mkdirSync(outDir, { recursive: true });

const profileSrc = readFileSync(resolve(root, 'src/data/profile.ts'), 'utf8');
function field(key) {
  const match = profileSrc.match(new RegExp(`\\n\\s+${key}: '([^']+)'`));
  if (!match) throw new Error(`No encontré ${key} en profile.ts`);
  return match[1];
}
const partsBlock = profileSrc.match(/parts: \[([\s\S]*?)\]/)?.[1] ?? '';
const parts = [...partsBlock.matchAll(/'([^']+)'/g)].map((m) => m[1].replace(/\s*·\s*$/, ''));

const data = { name: field('name'), tagline: field('tagline'), parts };

const targets = [
  { file: 'banner-linkedin.html', out: 'linkedin.png', width: 1584, height: 396, scale: 1 },
  { file: 'banner-facebook.html', out: 'facebook.png', width: 820, height: 312, scale: 2 },
];

const browser = await chromium.launch({ channel: 'chrome' });
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.width, height: t.height }, deviceScaleFactor: t.scale });
  await page.goto(`file://${resolve(root, 'build', t.file)}`, { waitUntil: 'networkidle' });
  await page.evaluate((d) => {
    document.querySelector('[data-name]').textContent = d.name;
    document.querySelector('[data-tagline]').innerHTML = d.tagline.replace(
      /decisiones de negocio\./,
      '<br><span class="highlight">decisiones de negocio.</span>',
    );
    // Dos filas fijas (2 + 2) para que el punto separador nunca quede colgado al final de una fila.
    const row = (items) => items.map((p) => `<span>${p}</span>`).join('<i aria-hidden="true"></i>');
    document.querySelector('[data-parts]').innerHTML =
      `<span class="row">${row(d.parts.slice(0, 2))}</span><span class="row">${row(d.parts.slice(2))}</span>`;
  }, data);
  await page.waitForTimeout(250);
  const out = resolve(outDir, t.out);
  await page.screenshot({ path: out, type: 'png' });
  console.log(`${t.out} → ${out} (${t.width * t.scale}×${t.height * t.scale})`);
  await page.close();
}
await browser.close();
