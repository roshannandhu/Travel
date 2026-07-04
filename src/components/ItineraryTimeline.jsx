import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../hooks/useLenis';
import './ItineraryTimeline.css';

/**
 * Day-by-day itinerary with a progress line that draws itself as you scroll
 * and steps that light up as they enter the viewport.
 */
export default function ItineraryTimeline({ itinerary, activeKey }) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        '.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 68%',
            end: 'bottom 62%',
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray('.timeline-step').forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25, x: -22 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 74%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    },
    { scope: rootRef, dependencies: [activeKey] }
  );

  return (
    <div className="timeline-wrap" ref={rootRef}>
      <h3 className="package-sub">Day-wise itinerary</h3>
      <div className="timeline">
        <div className="timeline-rail" aria-hidden="true">
          <div className="timeline-progress" />
        </div>
        {itinerary.map((step) => (
          <article className="timeline-step" key={`${activeKey}-${step.day}`}>
            <div className="timeline-dot" aria-hidden="true" />
            <p className="timeline-day">Day {String(step.day).padStart(2, '0')}</p>
            <h4 className="timeline-title">{step.title}</h4>
            <p className="timeline-text">{step.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
