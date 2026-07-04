import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import './MapContact.css';

export default function MapContact() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.mc-map',
        { clipPath: 'inset(8% 8% 8% 8% round 20px)', opacity: 0.4 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 20px)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.mc-map', start: 'top 82%', once: true },
        }
      );
      gsap.utils.toArray('.branch').forEach((b, i) => {
        gsap.fromTo(
          b,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            delay: (i % 4) * 0.06,
            scrollTrigger: { trigger: b, start: 'top 94%', once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section className="section mc" id="contact" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <span className="section-label">Find us</span>
          <h2 className="section-title">
            10+ branches,
            <br />
            one helpline
          </h2>
        </div>

        <div className="mc-grid">
          <div className="mc-map-wrap">
            <iframe
              className="mc-map"
              src={company.map.embed}
              title={company.map.label}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className="btn btn-gold mc-directions" href={company.map.link} target="_blank" rel="noreferrer">
              Get directions — H.O. Mukkam
            </a>
          </div>

          <div className="mc-branches">
            {company.branches.map((b) => (
              <div className={`branch ${b.head ? 'branch-head' : ''}`} key={b.name}>
                <p className="branch-name">{b.name}</p>
                {b.phones.map((p) => (
                  <a className="branch-phone" key={p} href={`tel:+91${p.replace(/[^0-9]/g, '')}`}>
                    {p}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mc-helpline">
          <div>
            <p className="mc-helpline-label">Help line — all days</p>
            <p className="mc-helpline-number h-display">{company.phones[0]}</p>
          </div>
          <div className="mc-helpline-actions">
            <a className="btn btn-primary" href={company.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp us
            </a>
            <a className="btn btn-ghost" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
