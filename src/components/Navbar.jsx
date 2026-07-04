import { useEffect, useState } from 'react';
import company from '../data/company';
import { scrollToSection } from '../hooks/useLenis';
import './Navbar.css';

const LINKS = [
  ['Home', '#home'],
  ['Package', '#package'],
  ['Destinations', '#destinations'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (target) => {
    setOpen(false);
    scrollToSection(target);
  };

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <div className="nav-inner container">
        <button className="nav-logo" onClick={() => go('#home')} aria-label="Fantastic Tourist Service — home">
          <span className="nav-logo-mark" aria-hidden="true">F</span>
          <span className="nav-logo-text">
            FANTASTIC
            <em>Tourist Service</em>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map(([label, href]) => (
            <button key={href} className="nav-link" onClick={() => go(href)}>
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary nav-call" href={`tel:+91${company.helpline}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" strokeLinejoin="round" />
            </svg>
            {company.phones[0]}
          </a>
          <button
            className="nav-burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="nav-drawer" aria-hidden={!open}>
        {LINKS.map(([label, href]) => (
          <button key={href} className="nav-drawer-link" onClick={() => go(href)} tabIndex={open ? 0 : -1}>
            {label}
          </button>
        ))}
        <a className="btn btn-primary" href={`tel:+91${company.helpline}`} tabIndex={open ? 0 : -1}>
          Call {company.phones[0]}
        </a>
      </div>
    </header>
  );
}
