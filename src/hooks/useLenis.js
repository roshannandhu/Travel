import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis = null;

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Create the Lenis smooth-scroll singleton, synced with GSAP's ticker. */
export function initLenis() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

/** Smooth-scroll to a selector/element, falling back to native scroll. */
export function scrollToSection(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4, ...options });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else el?.scrollIntoView({ behavior: 'smooth' });
  }
}
