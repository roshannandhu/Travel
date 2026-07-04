import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import company from '../data/company';
import { prefersReducedMotion } from '../hooks/useLenis';
import './AboutStats.css';

export default function AboutStats() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();

      gsap.utils.toArray('.stat-value').forEach((el) => {
        const target = Number(el.dataset.value);
        const from = Number(el.dataset.from || 0);
        const suffix = el.dataset.suffix || '';
        if (reduced) {
          el.textContent = target + suffix;
          return;
        }
        const obj = { v: from };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          onUpdate() {
            el.textContent = Math.round(obj.v) + suffix;
          },
        });
      });

      if (!reduced) {
        gsap.fromTo(
          '.about-copy > *',
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.about-copy', start: 'top 80%', once: true },
          }
        );
      }
    },
    { scope: rootRef }
  );

  return (
    <section className="section about" id="about" ref={rootRef}>
      <div className="container about-grid">
        <div className="about-copy">
          <span className="section-label">Who we are</span>
          <h2 className="section-title">
            The spirit of travelling,
            <br />
            since 1985
          </h2>
          <p className="about-text">{company.about}</p>
          <div className="about-badges">
            <span className="chip">{company.iso}</span>
            <span className="chip">Own fleet & professional drivers</span>
            <span className="chip">Quality-control department</span>
          </div>
        </div>

        <div className="about-stats">
          {company.stats.map((s) => (
            <div className="stat" key={s.label}>
              <span
                className="stat-value h-display"
                data-value={s.value}
                data-from={s.from || 0}
                data-suffix={s.suffix || ''}
              >
                {s.from || 0}
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
