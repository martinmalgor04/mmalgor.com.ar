/**
 * Motion del sitio: Lenis + GSAP.
 * Se carga en diferido desde ui.ts para no tocar el LCP.
 * Se apaga entero con prefers-reduced-motion.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);
document.documentElement.classList.add('has-gsap');

const ease = 'power3.out';
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* 1. Lenis + ScrollTrigger ---------------------------------------------- */

const lenis = new Lenis({
  lerp: 0.12,
  wheelMultiplier: 0.9,
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

/* 3. Hero: spotlight que sigue el mouse -------------------------------- */

const hero = document.getElementById('inicio');
const spot = document.querySelector<HTMLElement>('.hero__spot');

if (finePointer && hero && spot) {
  gsap.set(spot, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
  const xTo = gsap.quickTo(spot, 'x', { duration: 0.65, ease: 'power3' });
  const yTo = gsap.quickTo(spot, 'y', { duration: 0.65, ease: 'power3' });

  hero.addEventListener('pointerenter', () => {
    gsap.to(spot, { autoAlpha: 1, duration: 0.45, ease });
  });
  hero.addEventListener('pointerleave', () => {
    gsap.to(spot, { autoAlpha: 0, duration: 0.55, ease });
  });
  hero.addEventListener('pointermove', (event) => {
    const r = hero.getBoundingClientRect();
    xTo(event.clientX - r.left);
    yTo(event.clientY - r.top);
  });
}

/* 4. Tiles: tilt 3D + magnético ---------------------------------------- */

if (finePointer) {
  document.querySelectorAll<HTMLElement>('[data-tile]').forEach((wrap) => {
    const surface = wrap.querySelector<HTMLElement>('.tile') ?? wrap;
    gsap.set(surface, { transformPerspective: 900 });

    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.4, ease: 'power3' });
    const rxTo = gsap.quickTo(surface, 'rotationX', { duration: 0.4, ease: 'power3' });
    const ryTo = gsap.quickTo(surface, 'rotationY', { duration: 0.4, ease: 'power3' });

    wrap.addEventListener('pointermove', (event) => {
      const r = wrap.getBoundingClientRect();
      const px = (event.clientX - r.left) / r.width;
      const py = (event.clientY - r.top) / r.height;
      surface.style.setProperty('--spot-x', `${px * 100}%`);
      surface.style.setProperty('--spot-y', `${py * 100}%`);
      xTo((px - 0.5) * 14);
      yTo((py - 0.5) * 14);
      rxTo((0.5 - py) * 12);
      ryTo((px - 0.5) * 14);
    });

    wrap.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
      rxTo(0);
      ryTo(0);
    });
  });
}

/* 5. Stats: count-up ---------------------------------------------------- */

document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const raw = el.dataset.count ?? '';
  const match = raw.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return;
  const prefix = match[1];
  const target = Number(match[2]);
  const suffix = match[3];
  const state = { v: 0 };

  gsap.to(state, {
    v: target,
    duration: 1.4,
    ease: 'power2.out',
    delay: 0.35,
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
    },
  });
});

/* 6. Manifiesto: palabras que se encienden con el scroll ---------------- */

const manifiesto = document.querySelector<HTMLElement>('.manifiesto__texto');
const principios = gsap.utils.toArray<HTMLElement>('[data-pin-reveal]');

if (manifiesto) {
  const split = SplitText.create(manifiesto, {
    type: 'words',
    aria: 'auto',
    wordsClass: 'word',
  });
  const words = split.words as HTMLElement[];
  const highlightWords = words.filter((w) => w.closest('.highlight'));

  gsap.set(words, { opacity: 0.14 });
  gsap.set(principios, { autoAlpha: 0, y: 22 });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#como-pienso',
        start: 'top 48px',
        end: '+=70%',
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
      },
    });

    tl.to(words, { opacity: 1, stagger: 0.045, ease: 'none', duration: 0.8 });
    tl.to(
      highlightWords,
      {
        color: '#a2c6d4',
        textShadow: '0 0 34px rgba(33, 150, 243, 0.7)',
        duration: 0.35,
        ease: 'none',
      },
      '>-0.15',
    );
    tl.to(principios, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.45, ease: 'none' }, '>-0.05');

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  });

  mm.add('(max-width: 767px)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: manifiesto,
        start: 'top 78%',
        end: 'top 28%',
        scrub: 0.5,
      },
    });
    tl.to(words, { opacity: 1, stagger: 0.05, ease: 'none' });
    tl.to(principios, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'none' }, '>-0.1');
  });
}

ScrollTrigger.refresh();
