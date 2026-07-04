import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import destinations from '../data/destinations';
import { prefersReducedMotion } from '../hooks/useLenis';
import './Preloader.css';

/**
 * Branded intro curtain: counts up while the hero image + card thumbnails
 * actually preload, then wipes upward to reveal the hero.
 */
export default function Preloader({ onDone }) {
  const rootRef = useRef(null);
  const [pct, setPct] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const outStartedRef = useRef(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const reduced = prefersReducedMotion();
    const MIN = reduced ? 150 : 1700;
    const urls = [destinations[0].image, ...destinations.map((d) => d.thumb)];
    const start = Date.now();
    let loaded = 0;

    urls.forEach((src) => {
      const im = new Image();
      im.onload = im.onerror = () => (loaded += 1);
      im.src = src;
    });

    if (!reduced) {
      gsap.fromTo(
        '.preloader-word .char',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: 0.15 }
      );
    }

    const tick = setInterval(() => {
      const finished = loaded >= urls.length && Date.now() - start >= MIN;
      setPct((prev) => {
        if (finished) return 100;
        const timed = ((Date.now() - start) / MIN) * 92;
        const actual = (loaded / urls.length) * 100;
        const target = Math.min(99, Math.round(Math.max(timed, actual * 0.95)));
        return Math.max(prev, Math.min(prev + 3, target));
      });
    }, 45);

    return () => {
      clearInterval(tick);
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (pct < 100 || outStartedRef.current) return;
    outStartedRef.current = true;
    const finish = () => {
      document.documentElement.style.overflow = '';
      onDoneRef.current();
    };
    if (prefersReducedMotion()) {
      finish();
      return;
    }
    const tl = gsap.timeline({ onComplete: finish });
    tl.to('.preloader-inner', { opacity: 0, y: -34, duration: 0.45, ease: 'power2.in' }).to(
      rootRef.current,
      { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'expo.inOut' },
      '-=0.05'
    );
  }, [pct]);

  return (
    <div className="preloader" ref={rootRef} role="status" aria-label="Loading">
      <div className="preloader-inner">
        <p className="preloader-word" aria-hidden="true">
          {'FANTASTIC'.split('').map((c, i) => (
            <span className="char-mask" key={i}>
              <span className="char">{c}</span>
            </span>
          ))}
        </p>
        <p className="preloader-sub">Tourist Service · Since 1985</p>
        <p className="preloader-count">{pct}</p>
      </div>
    </div>
  );
}
