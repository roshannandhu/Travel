import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import destinations from '../data/destinations';
import company from '../data/company';
import { useDestination } from '../context/DestinationContext';
import { prefersReducedMotion } from '../hooks/useLenis';
import ItineraryTimeline from './ItineraryTimeline';
import './PackageDetails.css';

export default function PackageDetails() {
  const { active } = useDestination();
  const sectionRef = useRef(null);
  const dest = destinations[active];

  const whatsapp = `${company.whatsapp}?text=${encodeURIComponent(
    `Hi! I'd like to enquire about the ${dest.name} package (${dest.duration}).`
  )}`;

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      if (!reduced) {
        // content swap-in whenever the selected destination changes
        gsap.fromTo(
          '.package-swap',
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.06 }
        );

        // parallax banner
        gsap.fromTo(
          '.package-banner img',
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.package-banner',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        // banner clip reveal on scroll
        gsap.fromTo(
          '.package-banner',
          { clipPath: 'inset(6% 10% 6% 10% round 24px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            ease: 'none',
            scrollTrigger: {
              trigger: '.package-banner',
              start: 'top 92%',
              end: 'top 34%',
              scrub: true,
            },
          }
        );
      }

      // heights change per destination — recalculate trigger positions
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef, dependencies: [active] }
  );

  return (
    <section className="section package" id="package" ref={sectionRef}>
      <div className="container">
        <div className="package-head">
          <div>
            <span className="section-label">Featured package</span>
            <h2 className="section-title package-swap">
              {dest.name}
              <em className="package-title-tagline"> — {dest.tagline}</em>
            </h2>
          </div>
          <div className="package-index h-display" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}
          </div>
        </div>

        <div className="package-banner package-swap">
          <img src={dest.image} alt={`${dest.name} — ${dest.tagline}`} />
          <span className="package-banner-tag">{dest.region}</span>
        </div>

        <div className="package-grid">
          <div className="package-info package-swap">
            <p className="package-desc">{dest.description}</p>
            <h3 className="package-sub">Trip highlights</h3>
            <div className="package-highlights">
              {dest.highlights.map((h) => (
                <span className="chip" key={h}>
                  {h}
                </span>
              ))}
            </div>
          </div>

          <aside className="package-aside package-swap">
            <dl className="package-facts">
              <div>
                <dt>Duration</dt>
                <dd>{dest.duration}</dd>
              </div>
              <div>
                <dt>Best time</dt>
                <dd>{dest.bestTime}</dd>
              </div>
              <div>
                <dt>Ideal for</dt>
                <dd>{dest.idealFor}</dd>
              </div>
            </dl>
            <a className="btn btn-primary package-cta" href={whatsapp} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.1 13.9c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1a13 13 0 0 1-5.9-5.2c-.6-1-1-2.2-.9-3 .1-.6.7-1.5 1.2-1.6h.8c.3 0 .6-.1.9.7l1 2.4c.1.2.1.4 0 .6l-.5.8c-.2.2-.3.4-.1.7a9.6 9.6 0 0 0 3.9 3.5c.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.2 1c.3.2.5.3.6.4.1.2.1.6-.3 1z" />
              </svg>
              Enquire on WhatsApp
            </a>
            <a className="btn btn-ghost package-cta" href={`tel:+91${company.helpline}`}>
              Call {company.phones[0]}
            </a>
            <p className="package-note">Group departures · Custom dates available · {company.iso}</p>
          </aside>
        </div>

        <ItineraryTimeline itinerary={dest.itinerary} activeKey={dest.slug} />
      </div>
    </section>
  );
}
