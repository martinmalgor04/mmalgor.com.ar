// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { lastmodForUrl } from './src/lib/seo.ts';

const r2Host = 'pub-9195f8a94602486395419c2bb7beab6b.r2.dev';

export default defineConfig({
  site: 'https://mmalgor.com.ar',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

  image: {
    remotePatterns: [{ protocol: 'https', hostname: r2Host }],
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('.vcf') && !page.endsWith('.md') && !page.includes('/404'),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === 'https://mmalgor.com.ar') item.priority = 1.0;
        else if (url.includes('/notas/') || url.endsWith('/now')) item.priority = 0.8;
        else item.priority = 0.6;
        const lastmod = lastmodForUrl(item.url);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    icon(),
  ],

  // Sin Markdown en el sitio; evita el warning de Shiki + CSP.
  markdown: { syntaxHighlight: false },

  vite: { plugins: [tailwindcss()] },

  // En Vercel también se puede mandar CSP como header (HSTS y frame-ancestors
  // van en vercel.json). Acá la CSP sigue como <meta> con hashes de build.
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://cloud.umami.is'],
      },
      styleDirective: {
        resources: [
          { resource: "'self'", kind: 'element' },
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
      directives: [
        "default-src 'self'",
        "connect-src 'self' https://cloud.umami.is https://gateway.umami.is https://api-gateway.umami.dev",
        `img-src 'self' data: https://${r2Host}`,
        `media-src 'self' https://${r2Host}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
