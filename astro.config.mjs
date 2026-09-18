// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://mmalgor.com.ar',
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,

  integrations: [sitemap(), icon()],

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
        resources: ["'self'"],
      },
      directives: [
        "default-src 'self'",
        "connect-src 'self' https://cloud.umami.is https://api-gateway.umami.dev",
        "img-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
    },
  },
});
