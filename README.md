# mmalgor.com.ar

Sitio personal de **Martín Malgor**, director de Servicios & Sistemas (SyS).

Linktree híbrido con estética Apple: la primera pantalla es avatar + nombre + cuatro
botones de link (WhatsApp, LinkedIn, Email, SyS); al scrollear siguen las secciones
resumidas (qué hago, quién soy, cómo pienso, SyS, contacto).

Stack: **Astro 7** (salida estática) + **Tailwind 4** (solo tokens de marca) + **astro-icon**.
Cero React. JS propio en el cliente < 3 KB. Deploy en GitHub Pages vía Actions.

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
astro.config.mjs        site, fuentes (Montserrat self-hosted), CSP, sitemap, iconos
src/
  data/profile.ts       datos de Martín: única fuente para hero, JSON-LD, vCard y footer
  data/links.ts         los 4 botones del linktree (orden, ícono, evento de Umami)
  data/sections.ts      copy de las secciones inferiores
  layouts/Base.astro    head, OG, JSON-LD ProfilePage, Umami, fondo, header sticky, footer
  pages/index.astro     la página
  pages/martin-malgor.vcf.ts   vCard 4.0 generada en build
  pages/robots.txt.ts
  components/           Topbar · Background · StickyHeader · Avatar · LinkCard · LinkButton
                        Stats · ScrollCue · Section · Card · Footer
  scripts/ui.ts         reveal, header sticky, spotlight, copiar email
  styles/global.css     tokens (@theme), CTAs, reveal, reduced-motion
  assets/               foto del avatar (cuando exista)
public/                 CNAME, favicons, og.png, logo SyS
build/og-image.html     fuente de la OG image (no se publica)
scripts/og.mjs          genera public/og.png con Chrome (pnpm og)
.github/workflows/deploy.yml   build → Lighthouse CI → deploy
lighthouserc.json       umbrales: perf ≥ 0.95, a11y ≥ 0.95, LCP ≤ 2.5 s, CLS ≤ 0.1
```

---

## Datos y contenido

- **Todo lo de Martín** (nombre, bio, teléfonos, links, stats) vive en `src/data/profile.ts`.
- **Los botones** están en `src/data/links.ts`. Cada uno lleva `event` (nombre en Umami).
- **Foto del avatar:** guardarla como `src/assets/martin-malgor.jpg` (cuadrada, mínimo 512 px).
  El sitio la detecta solo; sin archivo muestra el monograma "MM".

---

## Analytics (Umami Cloud)

Sin cookies, sin banner. Cada botón dispara `data-umami-event` (`click-whatsapp`, `click-linkedin`…).

1. Crear cuenta Hobby en https://cloud.umami.is y agregar el sitio `mmalgor.com.ar`.
2. Copiar el **Website ID**.
3. Local: `.env` con `PUBLIC_UMAMI_ID=...` (ver `.env.example`).
4. GitHub: *Settings → Secrets and variables → Actions → Variables* → `PUBLIC_UMAMI_ID`.

Sin la variable el sitio no carga el script.

---

## Deploy (GitHub Pages por Actions)

Cada push a `main` corre `deploy.yml`: build → Lighthouse CI (falla si no cumple umbrales) → deploy.

Configuración única en GitHub:

1. *Settings → Pages → Source*: **GitHub Actions**.
2. *Settings → Pages → Custom domain*: `mmalgor.com.ar` (el `public/CNAME` ya lo fija en el output).
3. Cuando el DNS propague, marcar **Enforce HTTPS**.

DNS en el proveedor del dominio:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `martinmalgor04.github.io` |

GitHub Pages no admite headers HTTP: la CSP va como `<meta>` con hashes (`security.csp` en
`astro.config.mjs`). HSTS y `frame-ancestors` no se pueden emular; si algún día hacen falta,
poner Cloudflare como proxy.

---

## OG image

```bash
pnpm og
```

Renderiza `build/og-image.html` con el Chrome instalado y escribe `public/og.png` (1200×630).

---

## Sistema visual

Hereda el corporate tech premium de SyS con lenguaje Apple. Reglas que no se negocian:

- **Paleta:** navy `#0A1929` (fondo), navy-mid `#102A43` (superficies), blanco, celeste `#A2C6D4`
  (halo, anillo del avatar, texto secundario), eléctrico `#2196F3` (solo lo tocable: topbar,
  CTA WhatsApp, eyebrows, focus). `@theme` borra la paleta default de Tailwind: ningún otro hue compila.
- **Tipografía:** solo Montserrat (400/600/700/800), self-hosted por la Fonts API de Astro.
- **Materiales:** glass (blanco 6 % + blur 8 px) solo en los botones del hero y el header sticky.
  Todo lo de abajo es superficie opaca con hairlines de 1 px.
- **Motion:** 200-400 ms, `cubic-bezier(0.33, 1, 0.68, 1)`, solo opacity y transform.
  Si la animación se nota sola, está mal. Todo se apaga con `prefers-reduced-motion`.
- **Voz:** primera persona singular, voseo rioplatense. SyS siempre en tercera persona.
