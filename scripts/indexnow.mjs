#!/usr/bin/env node
/**
 * Avisa a Bing / Yandex / Naver / Seznam (y de ahí a ChatGPT Search y Copilot)
 * que las URLs canónicas cambiaron. Google no usa IndexNow: para Google es
 * Search Console → Inspeccionar URL.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mmalgor.com.ar';
const KEY = readFileSync(join(ROOT, 'src/data/indexnow.ts'), 'utf8').match(
  /INDEXNOW_KEY = '([^']+)'/,
)?.[1];

if (!KEY) throw new Error('No encontré INDEXNOW_KEY');

const KEY_URL = `${SITE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForKey(timeoutMs = 180_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(KEY_URL, { redirect: 'follow' });
      const body = (await res.text()).trim();
      if (res.ok && body === KEY) return;
      console.log(`Clave aún no publicada (${res.status}). Reintento en 8s…`);
    } catch (err) {
      console.log(`No pude leer ${KEY_URL}: ${err.message}. Reintento en 8s…`);
    }
    await sleep(8_000);
  }
  throw new Error(`Timeout esperando ${KEY_URL}`);
}

async function urlsFromSitemap() {
  const indexXml = await fetch(`${SITE}/sitemap-index.xml`).then((r) => r.text());
  const sitemapUrls = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [];
  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetch(sitemapUrl).then((r) => r.text());
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  return [...new Set(urls)];
}

const urls = await (async () => {
  await waitForKey();
  const fromSitemap = await urlsFromSitemap();
  return fromSitemap.length ? fromSitemap : [SITE];
})();

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'mmalgor.com.ar',
    key: KEY,
    keyLocation: KEY_URL,
    urlList: urls,
  }),
});

const text = await res.text();
console.log(`IndexNow ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (text) console.log(text);
if (![200, 202].includes(res.status)) process.exit(1);
console.log(urls.join('\n'));
