import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import destinations from '../data/destinations';
import { useDestination } from '../context/DestinationContext';
import { prefersReducedMotion } from '../hooks/useLenis';
import './CardRail.css';

const N = destinations.length;

/**
 * The Voyage-style destination card rail: shows every destination except the
 * active one, starting from the next in sequence. Clicking a card hands its
 * viewport rect to the hero so the new background can "flow" out of it.
 */
export default function CardRail() {
  const { active, select } = useDestination();
  const railRef = useRef(null);

  const order = Array.from({ length: N - 1 }, (_, k) => (active + 1 + k) % N);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '.dest-card',
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out', stagger: 0.055, delay: 0.15, overwrite: 'auto' }
      );
      railRef.current?.scrollTo({ left: 0 });
    },
    { scope: railRef, dependencies: [active] }
  );

  return (
    <div className="card-rail-wrap">
      <div className="card-rail" ref={railRef}>
        {order.map((i) => {
          const d = destinations[i];
          return (
            <button
              key={d.slug}
              className="dest-card"
              onClick={(e) => select(i, e.currentTarget.getBoundingClientRect())}
              aria-label={`Discover ${d.name}`}
            >
              <img src={d.thumb} alt="" loading="lazy" draggable="false" />
              <span className="dest-card-shade" aria-hidden="true" />
              <span className="dest-card-meta">
                <span className="dest-card-name">{d.name},</span>
                <span className="dest-card-region">{d.region}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
