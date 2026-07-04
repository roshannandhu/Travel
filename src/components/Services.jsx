import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import './Services.css';

const ICONS = {
  route: (
    <>
      <path d="M12 21s-6-5.1-6-10a6 6 0 1 1 12 0c0 4.9-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="4.5" width="16" height="12.5" rx="2.5" />
      <path d="M4 10.5h16M8 21l1-4m7 4l-1-4" strokeLinecap="round" />
    </>
  ),
  boat: (
    <>
      <path d="M4.5 17h15l-1.6 3.4H6.1L4.5 17zM12 4v9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5c3.4 1 5.6 3.4 6.2 8H12V5z" strokeLinejoin="round" />
    </>
  ),
  heart: (
    <path d="M20.8 8.6a5 5 0 0 0-8.8-3.2A5 5 0 0 0 3.2 8.6c0 5 8.8 10.4 8.8 10.4s8.8-5.4 8.8-10.4z" strokeLinejoin="round" />
  ),
  temple: (
    <path d="M4 21h16M6.5 21v-7m11 7v-7M4 14h16l-8-5.5L4 14zM12 3v5.5M9.5 5h5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  hotel: (
    <>
      <path d="M3 19v-9m0 4.5h18V19m0-4.5V12a3 3 0 0 0-3-3h-8v5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.5" cy="11.5" r="1.4" />
    </>
  ),
  plane: (
    <path d="M21 3L3 10.8l6.7 2.5L12 20.5l3-6.7L21 3z" strokeLinejoin="round" />
  ),
  ticket: (
    <>
      <path d="M4 8.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.2a2.3 2.3 0 0 0 0 4.6v1.2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.2a2.3 2.3 0 0 0 0-4.6V8.5z" strokeLinejoin="round" />
      <path d="M14.5 6.5v11" strokeDasharray="2.4 2.6" />
    </>
  ),
};

export default function Services() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 4) * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true },
          }
        );
      });
      gsap.fromTo(
        '.services-extra',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-extra', start: 'top 92%', once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section className="section services" id="services" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">Our exclusive services</span>
          <h2 className="section-title">
            Everything handled,
            <br />
            door to destination
          </h2>
        </div>

        <div className="services-grid">
          {company.services.map((s) => (
            <article className="service-card" key={s.title}>
              <span className="service-icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {ICONS[s.icon]}
                </svg>
              </span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-text">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="services-extra">
          <p className="services-extra-label">We also take you to</p>
          <div className="services-extra-chips">
            {company.alsoCovered.map((place) => (
              <span className="chip" key={place}>
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
