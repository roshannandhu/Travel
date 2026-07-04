import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import destinations from '../data/destinations';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import './InstagramGallery.css';

// six of our destination visuals as an instagram-style wall
// (a live feed needs Meta's API + access token — swap these tiles out then)
const TILES = ['kashmir', 'goa', 'alappuzha', 'manali', 'kodai', 'madurai'];

const IgIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export default function InstagramGallery() {
  const rootRef = useRef(null);
  const tiles = TILES.map((slug) => destinations.find((d) => d.slug === slug)).filter(Boolean);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.ig-tile',
        { y: 44, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: '.ig-grid', start: 'top 85%', once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section className="section ig" id="gallery" ref={rootRef}>
      <div className="container">
        <div className="ig-head">
          <div>
            <span className="section-label">From our journeys</span>
            <h2 className="section-title">Life on the road</h2>
          </div>
          <a className="btn btn-ghost ig-follow" href={company.instagram} target="_blank" rel="noreferrer">
            {IgIcon}
            Follow {company.instagramHandle}
          </a>
        </div>

        <div className="ig-grid">
          {tiles.map((d) => (
            <a
              className="ig-tile"
              key={d.slug}
              href={company.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`See our ${d.name} moments on Instagram`}
            >
              <img src={d.thumb} alt={`${d.name} trip moment`} loading="lazy" />
              <span className="ig-overlay">
                {IgIcon}
                <span>{company.instagramHandle}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
