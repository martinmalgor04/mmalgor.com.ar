# mmalgor.com.ar

Sitio personal de **Martín Malgor**, director de operaciones en Servicios y Sistemas (SyS). Corrientes.

Home de ficha: quién es, en qué puede ayudar, cómo piensa, meetups, ahora, nota y contacto. `/links` es la landing de bio. `/now` es lo que está pasando. `/notas` es la historia larga.

Stack: **Astro 7** (salida estática) + **Tailwind 4** (solo tokens de marca) + **astro-icon**. Cero React. JS inmediato ~2 KB; GSAP/Lenis (~53 KB gz) se cargan en diferido, solo en `/` y `/links`. Deploy en **Vercel**.

---

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # genera dist/
pnpm preview
pnpm check        # astro check (tipos)
```

Hay un `.claude/launch.json` con la configuración `mmalgor-astro`.

---

## Estructura

```
astro.config.mjs        site, CSP (meta con hashes de build), sitemap, iconos, remotePatterns
src/
  data/profile.ts       datos de Martín: única fuente para hero, JSON-LD, vCard y footer
  data/links.ts         tiles de /links (orden, ícono, evento de Umami)
  data/sections.ts      copy de las secciones de la home
  data/now.ts           /now — solo lo que cambia
  data/notes.ts         notas
  data/meetups.ts       eventos; fotos y video en R2
  layouts/Base.astro    head, OG, JSON-LD, Umami, header sticky, footer
  pages/                /, /now, /links, /notas/[slug], 404, rss, llms, vcf, robots
  components/           StickyHeader · Avatar · LinkTile · BrandMarks · Stats
                        Section · Card · MeetupList · MeetupGallery · Footer · ContactCtas
  scripts/ui.ts         reveal (IntersectionObserver), header sticky, copiar
  scripts/motion.ts     GSAP + Lenis, solo si hay algo que animar
  styles/global.css     tokens (@theme), CTAs, reveal, páginas internas, reduced-motion
  assets/               retrato (Astro <Image> → webp)
  lib/seo.ts            JSON-LD, Markdown, llms.txt
  lib/dates.ts          fecha() con Intl es-AR
public/                 favicons, og.jpg, marcas en /brands, clave IndexNow
build/og-image.html     fuente de la OG image (no se publica)
scripts/og.mjs          genera public/og.jpg con Chrome (pnpm og)
scripts/indexnow.mjs    avisa a Bing / ChatGPT Search
.github/workflows/ci.yml        build + Lighthouse (desktop y mobile). No despliega.
.github/workflows/indexnow.yml  corre después del CI, lee el sitemap vivo en Vercel
vercel.json             redirects, HSTS, frame-ancestors
lighthouserc.json       umbrales desktop: perf ≥ 0.95, a11y ≥ 0.95, LCP ≤ 2.5 s, CLS ≤ 0.1
```

---

## Datos y contenido

- **Todo lo de Martín** (nombre, rol, teléfonos, links, stats, `joinedYear`, cursada) vive en `src/data/profile.ts`.
- **Los tiles de /links** están en `src/data/links.ts`. Cada uno lleva `event` (nombre en Umami). Convención: `{accion}-{destino}-{ubicacion}`.
- **Foto del avatar:** `src/assets/martin-malgor.jpg`. Astro la sirve en webp a 224 px.
- Fechas visibles salen de `fecha(iso)` en `src/lib/dates.ts`. No duplicar el label a mano.

Voz: primera persona singular, voseo rioplatense. SyS siempre en tercera persona.

---

## Analytics (Umami Cloud)

Sin cookies, sin banner. Cada botón dispara `data-umami-event`.

1. Crear cuenta Hobby en https://cloud.umami.is y agregar el sitio `mmalgor.com.ar`.
2. Copiar el **Website ID**.
3. Local: `.env` con `PUBLIC_UMAMI_ID=...` (ver `.env.example`).
4. **Vercel → Project → Settings → Environment Variables → `PUBLIC_UMAMI_ID`** (Production, Preview). Redeployar.

Sin la variable el HTML de producción no carga el script: los `data-umami-event` no miden nada.

---

## Deploy (Vercel)

El sitio corre en Vercel. Cada push a `main` dispara el deploy de Vercel (Git integration) y, en paralelo, el workflow `ci.yml` de GitHub: `pnpm check` + build + Lighthouse. El job de GitHub Pages no existe.

Variables de entorno van en Vercel, no en GitHub Actions.

DNS en el proveedor del dominio:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | IPs de Vercel (las que muestra el dashboard) |
| CNAME | `www` | `cname.vercel-dns.com` |

En Vercel → Domains: agregar `mmalgor.com.ar` y `www.mmalgor.com.ar`, con redirect `www` → apex.

La CSP va como `<meta>` con hashes regenerados en cada build (`security.csp` en `astro.config.mjs`). HSTS, `X-Frame-Options` y `X-Content-Type-Options` van como headers en `vercel.json`.

---

## OG image

```bash
pnpm og
```

Lee nombre, tagline e identity de `profile.ts`, renderiza `build/og-image.html` con el Chrome instalado y escribe `public/og.jpg` (1200×630, JPEG q82, ~90 KB). WhatsApp no muestra preview por encima de ~300 KB.

---

## Sistema visual

Apple dark mode real. Reglas que no se negocian:

- **Paleta:** negro `#000` (fondo), elev-1 `#1c1c1e` y elev-2 `#2c2c2e` (superficies), blanco, muted `#98989d`, faint `#86868b`, cielo `#A2C6D4` (halo), eléctrico `#2196F3` (kickers, links, íconos, focus). CTAs y skip link usan `--color-electric-deep` `#0071e3` para llegar a AA. `@theme` borra la paleta default de Tailwind.
- **Tipografía:** pila del sistema (SF Pro en Apple). 0 KB de fuentes.
- **Materiales:** botones opacos. Header sticky con blur. Hairlines de 1 px.
- **Motion:** 200-400 ms, `cubic-bezier(0.33, 1, 0.68, 1)`, solo opacity y transform. Si la animación se nota sola, está mal. Todo se apaga con `prefers-reduced-motion`.
