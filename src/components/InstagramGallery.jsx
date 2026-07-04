import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import './InstagramGallery.css';

const IgIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/** Round-robin the posts into `n` masonry columns. */
function chunkColumns(posts, n) {
  const cols = Array.from({ length: n }, () => []);
  posts.forEach((p, i) => cols[i % n].push(p));
  return cols;
}

export default function InstagramGallery() {
  const rootRef = useRef(null);
  const columns = chunkColumns(company.igPosts, 3);

  /* load Instagram's official embed script and hydrate the blockquotes */
  useEffect(() => {
    const hydrate = () => window.instgrm?.Embeds?.process();
    if (window.instgrm) {
      hydrate();
    } else {
      const s = document.createElement('script');
      s.src = 'https://www.instagram.com/embed.js';
      s.async = true;
      s.onload = hydrate;
      document.body.appendChild(s);
    }

    // embeds grow as they hydrate — keep scroll-trigger positions honest
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(rootRef.current);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // staggered entrance for each post card
      gsap.utils.toArray('.ig-post').forEach((post, i) => {
        gsap.fromTo(
          post,
          { y: 70, opacity: 0, rotate: i % 2 ? 1.2 : -1.2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform', // let the CSS hover lift take over afterwards
            scrollTrigger: { trigger: post, start: 'top 92%', once: true },
          }
        );
      });

      // each masonry column drifts at its own speed while scrolling through
      gsap.utils.toArray('.ig-col').forEach((col, i) => {
        const speed = [-46, 34, -22][i % 3];
        gsap.fromTo(
          col,
          { y: -speed },
          {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: '.ig-columns',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section ig" id="gallery" ref={rootRef}>
      <div className="container">
        <div className="ig-head">
          <div>
            <span className="section-label">From our journeys</span>
            <h2 className="section-title">Straight from
              <br />
              our Instagram</h2>
          </div>
          <a className="btn btn-ghost ig-follow" href={company.instagram} target="_blank" rel="noreferrer">
            {IgIcon}
            Follow {company.instagramHandle}
          </a>
        </div>

        <div className="ig-columns">
          {columns.map((posts, c) => (
            <div className="ig-col" key={c}>
              {posts.map((url) => (
                <div className="ig-post" key={url}>
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
