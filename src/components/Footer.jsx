import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import company from '../data/company';
import destinations from '../data/destinations';
import { useDestination } from '../context/DestinationContext';
import { scrollToSection, prefersReducedMotion } from '../hooks/useLenis';
import './Footer.css';

export default function Footer() {
  const rootRef = useRef(null);
  const { select } = useDestination();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.footer-big span',
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.footer-big', start: 'top 88%', once: true },
        }
      );
    },
    { scope: rootRef }
  );

  const year = new Date().getFullYear();

  return (
    <footer className="footer" ref={rootRef}>
      <div className="container">
        <p className="footer-big h-display" aria-label={company.motto}>
          {company.motto.toUpperCase().split(' ').map((w, i) => (
            <span key={i} className="footer-big-mask">
              <span>{w}&nbsp;</span>
            </span>
          ))}
        </p>

        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-logo">
              FANTASTIC <em>Tourist Service</em>
            </p>
            <p className="footer-tagline">{company.tagline}. Conducting pleasure trips to attractive tourist centres all over India since {company.since}.</p>
            <div className="footer-socials">
              <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href={company.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5v2H7.5V12H10v10h4V12h2.6l.9-3.5H14z" />
                </svg>
              </a>
              <a href={company.website} target="_blank" rel="noreferrer" aria-label="Website">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Destinations</p>
            {destinations.slice(0, 6).map((d, i) => (
              <button
                key={d.slug}
                className="footer-link"
                onClick={() => {
                  select(i, null);
                  scrollToSection('#home');
                }}
              >
                {d.name}
              </button>
            ))}
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Company</p>
            <button className="footer-link" onClick={() => scrollToSection('#about')}>About us</button>
            <button className="footer-link" onClick={() => scrollToSection('#services')}>Services</button>
            <button className="footer-link" onClick={() => scrollToSection('#gallery')}>Gallery</button>
            <button className="footer-link" onClick={() => scrollToSection('#contact')}>Contact</button>
          </div>

          <div className="footer-col">
            <p className="footer-col-title">Reach us</p>
            {company.phones.map((p) => (
              <a className="footer-link" key={p} href={`tel:+91${p.replace(/[^0-9]/g, '')}`}>
                {p}
              </a>
            ))}
            <a className="footer-link" href={`mailto:${company.email}`}>{company.email}</a>
            <a className="footer-link" href={company.map.link} target="_blank" rel="noreferrer">
              H.O. Mukkam, Kozhikode
            </a>
          </div>
        </div>

        <div className="footer-base">
          <p>© {year} {company.name} · {company.iso}</p>
          <p>Since {company.since} · Kerala, India</p>
        </div>
      </div>
    </footer>
  );
}
