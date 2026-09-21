// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { lastmodForUrl } from './src/lib/seo.ts';

export default defineConfig({
  site: 'https://mmalgor.com.ar',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

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

  // GitHub Pages no permite headers HTTP: la CSP va como <meta> con hashes.
  security: {
    csp: {
      scriptDirective: {
        resources: ["'self'", 'https://cloud.umami.is'],
      },
      styleDirective: {
        resources: [
          "'self'",
          // GSAP y Lenis escriben transform/opacity en style="". No afloja <style> ni CSS externo.
          { resource: "'unsafe-inline'", kind: 'attribute' },
        ],
      },
      directives: [
        "default-src 'self'",
        "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev",
        "img-src 'self' data: https://serviciosysistemas.com.ar https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev",
        // El video de los meetups sale del CDN; sin esto cae en default-src 'self'.
        "media-src 'self' https://pub-9195f8a94602486395419c2bb7beab6b.r2.dev",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
