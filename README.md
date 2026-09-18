# mmalgor.com.ar

Sitio personal de **Martín Malgor**, director de Servicios & Sistemas (SyS).

One-page estático: HTML + CSS + un archivo de JS sin dependencias. Sin build step, sin
framework, sin `node_modules`. El sitio es contenido, no una app.

---

## Estructura

```
index.html          Toda la página (nav, hero, qué hago, quién soy, cómo pienso, SyS, contacto, footer)
styles.css          Sistema visual completo (tokens en :root)
main.js             Menú mobile · scroll reveal · contador de stats
assets/
  logo-sys-horizontal-color.png   Logo oficial SyS (no modificar ni recolorizar)
  og-image.png                    1200×630, generada desde build/og-image.html
  favicon.svg · favicon-32.png · apple-touch-icon.png
build/
  og-image.html     Fuente de la OG image (no se publica)
  icon.html         Fuente de los iconos PNG (no se publica)
CNAME               Dominio custom para GitHub Pages
_headers            Headers de seguridad y cache (sólo los toma Cloudflare Pages)
robots.txt · sitemap.xml
```

---

## Desarrollo local

Cualquier servidor estático sirve:

```bash
python3 -m http.server 4321
```

Y abrir http://localhost:4321. Hay un `.claude/launch.json` con esa misma configuración.

---

## Deploy

### GitHub Pages (configurado)

El repo publica la rama `main` desde la raíz. El archivo `CNAME` fija el dominio
`mmalgor.com.ar`. Cada push a `main` redeploya solo.

**DNS a cargar en NIC Argentina (o en el proveedor de DNS del dominio):**

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `martinmalgor04.github.io` |

Cuando el DNS propague (hasta 24 h), en *Settings → Pages* del repo marcar
**Enforce HTTPS**. GitHub emite el certificado solo. `www.mmalgor.com.ar` redirige al apex.

### Cloudflare Pages (alternativa)

Build command vacío, output directory `/`. El archivo `_headers` queda tomado
automáticamente. Agregar `mmalgor.com.ar` como custom domain y una regla de redirect
`www.mmalgor.com.ar/* → https://mmalgor.com.ar/$1` (301).

---

## Regenerar imágenes

La OG image y los iconos se renderizan con Chrome headless desde el HTML de `build/`:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=6000 --screenshot=assets/og-image.png "file://$PWD/build/og-image.html"
```

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --window-size=512,512 --virtual-time-budget=2000 --screenshot=/tmp/icon-512.png "file://$PWD/build/icon.html" && cp /tmp/icon-512.png assets/apple-touch-icon.png && sips -z 180 180 assets/apple-touch-icon.png && cp /tmp/icon-512.png assets/favicon-32.png && sips -z 32 32 assets/favicon-32.png
```

---

## Sistema visual

Hereda el sistema corporate tech premium de SyS. Los tokens viven en `:root` de
`styles.css`. Reglas que no se negocian:

- **Tipografía:** sólo Montserrat (300/400/600/700/800), `font-display: swap`.
- **Azul eléctrico `#2196F3`:** sólo en CTAs, borde superior de 6px, eyebrows, palabras
  destacadas (`.highlight`) y números grandes (stats, facetas).
- **Celeste `#A2C6D4`:** sólo en los círculos concéntricos del hero y en los labels de contacto.
- **Ningún otro hue.** Toda la jerarquía se resuelve con tipografía, superficie y espacio.
- **Logo de SyS:** sin deformar, sin recolorizar, con su área de protección.
- **Voz:** primera persona singular, voseo rioplatense. SyS siempre en tercera persona.
- **Motion:** si la animación se nota sola, está mal. Todo respeta `prefers-reduced-motion`.

---

## Pendientes opcionales

- **Foto profesional.** El hero funciona sólo con tipografía. Si aparece una foto: guardarla
  como `assets/martin-malgor.webp` (+ `.jpg`), agregar la clase `hero--con-foto` a la
  `<section class="hero">` y descomentar el bloque `<figure class="hero__foto">` que ya está
  en `index.html`. El CSS del layout con foto ya existe.
- **Trayectoria con fechas.** La sección "Quién soy" reemplaza a la timeline del diseño
  original porque no había hitos con año confirmados. Si se quieren agregar (ingreso a SyS,
  dirección, inicio en la UTN), va como lista cronológica dentro de esa misma sección.
- **Escritos / LinkedIn.** Grid de posts destacados, entre "SyS" y "Contacto". Sin datos
  reales serían cards vacías, así que quedó afuera.
