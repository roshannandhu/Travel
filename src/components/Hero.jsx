import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import destinations from '../data/destinations';
import company from '../data/company';
import { useDestination } from '../context/DestinationContext';
import { scrollToSection, prefersReducedMotion } from '../hooks/useLenis';
import CardRail from './CardRail';
import './Hero.css';

const N = destinations.length;

/** Builds one absolutely-positioned background layer for a destination. */
function makeLayer(dest) {
  const layer = document.createElement('div');
  layer.className = 'hero-bg-layer';
  const img = document.createElement('img');
  img.src = dest.image;
  img.alt = '';
  img.draggable = false;
  layer.appendChild(img);
  return layer;
}

function startKenBurns(layer) {
  if (prefersReducedMotion()) return;
  const img = layer.querySelector('img');
  gsap.to(img, {
    scale: '+=0.07',
    duration: 22,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  });
}

export default function Hero({ ready }) {
  const { active, select, originRef, lastUserActionRef } = useDestination();
  const heroRef = useRef(null);
  const bgStackRef = useRef(null);
  const currentLayerRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const counterRef = useRef(null);
  const introPlayedRef = useRef(false);
  const firstRenderRef = useRef(true);
  const dest = destinations[active];

  /* ---- initial background layer ---- */
  useEffect(() => {
    const stack = bgStackRef.current;
    const layer = makeLayer(destinations[0]);
    gsap.set(layer.querySelector('img'), { scale: 1.06 });
    stack.appendChild(layer);
    currentLayerRef.current = layer;
    startKenBurns(layer);
    return () => {
      stack.innerHTML = '';
      currentLayerRef.current = null;
    };
  }, []);

  /* ---- background "flow" transition on selection change ---- */
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const stack = bgStackRef.current;
    const old = currentLayerRef.current;
    const layer = makeLayer(destinations[active]);
    const img = layer.querySelector('img');

    // start clipped to the clicked card's rect (or a centered window)
    const rect = originRef.current;
    originRef.current = null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const from = rect
      ? `inset(${Math.max(rect.top, 0)}px ${Math.max(vw - rect.right, 0)}px ${Math.max(vh - rect.bottom, 0)}px ${Math.max(rect.left, 0)}px round 18px)`
      : 'inset(42% 38% 42% 38% round 26px)';

    gsap.set(layer, { clipPath: from });
    gsap.set(img, { scale: 1.28 });
    stack.appendChild(layer);
    currentLayerRef.current = layer;

    if (prefersReducedMotion()) {
      gsap.set(layer, { clipPath: 'inset(0px 0px 0px 0px round 0px)' });
      gsap.set(img, { scale: 1.02 });
      old?.remove();
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete() {
        old?.remove();
        startKenBurns(layer);
      },
    });
    tl.to(layer, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 1.15 }, 0)
      .to(img, { scale: 1.06, duration: 1.5, ease: 'expo.out' }, 0);
    if (old) {
      tl.to(old.querySelector('img'), { scale: '+=0.06', duration: 1.15 }, 0).to(
        old,
        { opacity: 0.45, duration: 1.15 },
        0
      );
    }
    return () => tl.kill();
  }, [active, originRef]);

  /* ---- headline split-text swap ---- */
  useLayoutEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    el.textContent = dest.name;
    const split = new SplitType(el, { types: 'chars' });
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        split.chars,
        { yPercent: 112, rotate: 5, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.035, delay: 0.12 }
      );
      gsap.fromTo(
        taglineRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.4 }
      );
      gsap.fromTo(
        counterRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.2 }
      );
    }
    return () => split.revert();
  }, [active, dest.name]);

  /* ---- intro reveal once the preloader finishes ---- */
  useEffect(() => {
    if (!ready || introPlayedRef.current) return;
    introPlayedRef.current = true;
    if (prefersReducedMotion()) return;
    const q = gsap.utils.selector(heroRef);
    gsap.fromTo(
      q('.hero-kicker, .hero-cta, .hero-scroll-hint'),
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.25 }
    );
    gsap.fromTo(
      q('.hero-watermark'),
      { opacity: 0 },
      { opacity: 1, duration: 1.6, ease: 'power2.out', delay: 0.5 }
    );
  }, [ready]);

  /* ---- auto-advance every 8s while hero is visible & user idle ---- */
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      if (Date.now() - lastUserActionRef.current < 12000) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 120) return;
      select(active + 1, null, { user: false });
    }, 8000);
    return () => clearInterval(id);
  }, [active, select, lastUserActionRef]);

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-bg-stack" ref={bgStackRef} aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-watermark" aria-hidden="true">
        FANTASTIC
      </div>

      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-kicker">
            {company.iso} · Since {company.since}
          </p>
          <h1 className="hero-title h-display">
            <span className="hero-discover">Discover</span>
            <span className="hero-name-mask">
              <span className="hero-name" ref={nameRef}>
                {dest.name}
              </span>
            </span>
          </h1>
          <p className="hero-tagline" ref={taglineRef}>
            {dest.tagline} · {dest.region}
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={() => scrollToSection('#package')}>
              Explore package
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a className="btn btn-ghost" href={`tel:+91${company.helpline}`}>
              Call {company.phones[0]}
            </a>
          </div>
        </div>

        <CardRail />
      </div>

      <div className="hero-footer container">
        <button className="hero-scroll-hint" onClick={() => scrollToSection('#package')}>
          <span className="hero-scroll-line" />
          Scroll to explore
        </button>
        <div className="hero-counter" ref={counterRef}>
          <span className="hero-counter-current">{String(active + 1).padStart(2, '0')}</span>
          <span className="hero-counter-total">/ {String(N).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  );
}
