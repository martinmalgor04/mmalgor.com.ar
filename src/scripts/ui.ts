/**
 * JS inmediato del sitio. Tres cosas síncronas + motion en diferido:
 * 1. Marca .js para CSS (hero rise, fallback de reveal).
 * 2. Header sticky cuando el hero sale del viewport.
 * 3. Copiar email al portapapeles.
 * GSAP + Lenis se importan después, para no competir con el LCP.
 */

document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealables = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if (reduced) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  void import('./motion').catch(() => {
    revealables.forEach((el) => el.classList.add('is-visible'));
  });
}

/* Header sticky --------------------------------------------------------- */

const hero = document.getElementById('inicio');
const header = document.getElementById('sticky-header');

if (hero && header && header.dataset.pinned !== 'true') {
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-visible', window.scrollY > hero.offsetHeight - 160);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

/* Copiar email ---------------------------------------------------------- */

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  let timer: number | undefined;
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      btn.classList.add('is-copied');
      window.clearTimeout(timer);
      timer = window.setTimeout(() => btn.classList.remove('is-copied'), 1200);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  });
});
