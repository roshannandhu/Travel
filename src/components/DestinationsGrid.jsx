import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import destinations from '../data/destinations';
import { useDestination } from '../context/DestinationContext';
import { scrollToSection, prefersReducedMotion } from '../hooks/useLenis';
import './DestinationsGrid.css';

export default function DestinationsGrid() {
  const { active, select } = useDestination();
  const rootRef = useRef(null);

  const pick = (i) => {
    // the hero is off-screen here, so reveal from a centered window instead
    select(i, null);
    scrollToSection('#home');
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('.dg-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section destinations" id="destinations" ref={rootRef}>
      <div className="container">
        <div className="section-head dg-head">
          <div>
            <span className="section-label">Where next?</span>
            <h2 className="section-title">
              Eleven signature
              <br />
              destinations
            </h2>
          </div>
          <p className="dg-blurb">
            Pick a place — the page takes you there. Every route is escorted by our own drivers and
            crew, with hotels, food and sightseeing handled end-to-end.
          </p>
        </div>

        <div className="dg-grid">
          {destinations.map((d, i) => (
            <button
              key={d.slug}
              className={`dg-card ${i === active ? 'dg-card-active' : ''}`}
              onClick={() => pick(i)}
              aria-label={`Select ${d.name} package`}
            >
              <img src={d.card} alt={`${d.name} — ${d.tagline}`} loading="lazy" />
              <span className="dg-shade" aria-hidden="true" />
              <span className="dg-meta">
                <span className="dg-name">{d.name}</span>
                <span className="dg-info">
                  {d.duration} · {d.region}
                </span>
              </span>
              <span className="dg-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
