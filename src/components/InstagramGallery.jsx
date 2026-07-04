import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import horizontalLoop from '../lib/horizontalLoop';
import './InstagramGallery.css';

const IgIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export default function InstagramGallery() {
  const rootRef = useRef(null);

  /* hydrate the embeds only when the section approaches the viewport —
     twelve Instagram iframes shouldn't weigh down the initial page load */
  useEffect(() => {
    const el = rootRef.current;
    const hydrate = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const s = document.createElement('script');
        s.src = 'https://www.instagram.com/embed.js';
        s.async = true;
        s.onload = () => window.instgrm?.Embeds?.process();
        document.body.appendChild(s);
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          hydrate();
        }
      },
      { rootMargin: '1200px' }
    );
    io.observe(el);

    // embeds grow as they hydrate — keep scroll-trigger positions honest
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(rootRef);

      // the whole marquee fades in once
      gsap.fromTo(
        q('.ig-marquee'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: q('.ig-marquee')[0], start: 'top 92%', once: true },
        }
      );

      // seamless auto-flow, rebuilt per breakpoint because card widths change
      const mm = gsap.matchMedia();
      const build = () => {
        const items = q('.ig-post');
        if (!items.length) return () => {};
        const loop = horizontalLoop(items, { repeat: -1, speed: 0.42, paddingRight: 22 });
        const wrap = q('.ig-marquee')[0];
        const rest = () => gsap.to(loop, { timeScale: 0, duration: 0.7, overwrite: true });
        const flow = () => gsap.to(loop, { timeScale: 1, duration: 0.7, overwrite: true });
        wrap.addEventListener('mouseenter', rest);
        wrap.addEventListener('mouseleave', flow);
        wrap.addEventListener('touchstart', rest, { passive: true });
        wrap.addEventListener('touchend', flow);
        return () => {
          wrap.removeEventListener('mouseenter', rest);
          wrap.removeEventListener('mouseleave', flow);
          wrap.removeEventListener('touchstart', rest);
          wrap.removeEventListener('touchend', flow);
          loop.kill();
        };
      };
      mm.add('(min-width: 701px)', build);
      mm.add('(max-width: 700px)', build);

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section className="section ig" id="gallery" ref={rootRef}>
      <div className="container">
        <div className="ig-head">
          <div>
            <span className="section-label">From our journeys</span>
            <h2 className="section-title">
              Straight from
              <br />
              our Instagram
            </h2>
          </div>
          <a className="btn btn-ghost ig-follow" href={company.instagram} target="_blank" rel="noreferrer">
            {IgIcon}
            Follow {company.instagramHandle}
          </a>
        </div>
      </div>

      <div className="ig-marquee">
        <div className="ig-track">
          {company.igPosts.map((url) => (
            <div className="ig-post" key={url}>
              <div className="ig-card">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={url}
                  data-instgrm-version="14"
                >
                  <a href={url} target="_blank" rel="noreferrer">
                    View this post on Instagram
                  </a>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
