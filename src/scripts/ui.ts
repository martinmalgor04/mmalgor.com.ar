/**
 * Todo el JS del sitio (< 2 KB). Tres cosas:
 * 1. Scroll reveal de las secciones (IntersectionObserver).
 * 2. Header sticky cuando el hero sale del viewport.
 * 3. Copiar email al portapapeles con feedback "Copiado".
 */

document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasIO = 'IntersectionObserver' in window;

/* 1. Scroll reveal ------------------------------------------------------ */

const revealables = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

if (reduced || !hasIO) {
  revealables.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      const porGrupo = new Map<Element | null, number>();
      entries
        .filter((e) => e.isIntersecting)
        .forEach((entry) => {
          const padre = entry.target.parentElement;
          const i = porGrupo.get(padre) ?? 0;
          porGrupo.set(padre, i + 1);
          (entry.target as HTMLElement).style.setProperty('--reveal-delay', `${i * 70}ms`);
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

/* 2. Header sticky ------------------------------------------------------ */

const hero = document.getElementById('inicio');
const header = document.getElementById('sticky-header');

if (hero && header) {
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

/* 3. Copiar email ------------------------------------------------------- */

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
