/**
 * Motion del sitio: Lenis (scroll) + GSAP (reveal, spotlight, magnético).
 * Se carga en diferido desde ui.ts para no tocar el LCP.
 * Se apaga entero con prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);
document.documentElement.classList.add('has-gsap');

const ease = 'power3.out';
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* 1. Lenis + ScrollTrigger ---------------------------------------------- */

const lenis = new Lenis({
  lerp: 0.14,
  wheelMultiplier: 0.88,
  touchMultiplier: 1,
  autoRaf: false,
});

lenis.on('scroll', () => ScrollTrigger.update());
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (event) => {
    if (a.classList.contains('skip-link')) return;
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector<HTMLElement>(id);
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, { offset: -56, duration: 1.05 });
  });
});

/* 2. Reveal por scroll -------------------------------------------------- */

const revealables = gsap.utils.toArray<HTMLElement>('[data-reveal]');

gsap.set(revealables, { autoAlpha: 0, y: 16 });

ScrollTrigger.batch(revealables, {
  start: 'top 90%',
  once: true,
  onEnter: (batch) => {
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.07,
      ease,
      overwrite: true,
    });
  },
});

/* 3. Spotlight + magnético en tiles (pointer fino) ---------------------- */

if (finePointer) {
  document.querySelectorAll<HTMLElement>('[data-tile]').forEach((wrap) => {
    const surface = wrap.querySelector<HTMLElement>('.tile') ?? wrap;
    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.45, ease: 'power3' });

    wrap.addEventListener('pointermove', (event) => {
      const r = wrap.getBoundingClientRect();
      const px = ((event.clientX - r.left) / r.width) * 100;
      const py = ((event.clientY - r.top) / r.height) * 100;
      surface.style.setProperty('--spot-x', `${px}%`);
      surface.style.setProperty('--spot-y', `${py}%`);
      xTo((event.clientX - r.left - r.width / 2) * 0.05);
      yTo((event.clientY - r.top - r.height / 2) * 0.05);
    });

    wrap.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

ScrollTrigger.refresh();
