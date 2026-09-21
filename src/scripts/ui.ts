/**
 * JS inmediato del sitio. Tres cosas síncronas + motion en diferido:
 * 1. Marca .js para CSS (hero rise, fallback de reveal).
 * 2. Header sticky cuando el hero sale del viewport.
 * 3. Copiar al portapapeles.
 * GSAP + Lenis se importan solo si hay algo que animar.
 */

document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealables = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
const needsMotion = document.querySelector(
  '[data-reveal], [data-tile], [data-count], .manifiesto__texto',
);

function reveal(el: HTMLElement) {
  el.classList.add('is-visible');
}

document.addEventListener('focusin', (event) => {
  const el = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-reveal]');
  if (el) reveal(el);
});

if (reduced) {
  revealables.forEach(reveal);
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  revealables.forEach((el) => io.observe(el));
  window.setTimeout(() => revealables.forEach(reveal), 2500);

  if (needsMotion) {
    void import('./motion').catch(() => {
      revealables.forEach(reveal);
    });
  }
}

/* Header sticky --------------------------------------------------------- */

const hero = document.getElementById('inicio');
const header = document.getElementById('sticky-header');

if (hero && header && header.dataset.pinned !== 'true') {
  let ticking = false;
  const update = () => {
    const visible = window.scrollY > hero.offsetHeight - 160;
    header.classList.toggle('is-visible', visible);
    header.toggleAttribute('inert', !visible);
    ticking = false;
  };
  header.toggleAttribute('inert', true);
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

/* Copiar ---------------------------------------------------------------- */

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  let timer: number | undefined;
  const status = btn.querySelector<HTMLElement>('[role="status"]');
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      btn.classList.add('is-copied');
      if (status) status.textContent = 'Copiado';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        btn.classList.remove('is-copied');
        if (status) status.textContent = '';
      }, 1200);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  });
});
