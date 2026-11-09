import {useEffect, useRef, useState} from 'react';
import {hero} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useStageScroll} from '../hooks/useStageScroll';
import {Img} from './Img';

const SLIDE_MS = 6500;

/**
 * Home hero: the venue's own photographs cross-fade under a slow drift —
 * standing in for a film — beneath the condensed serif headline. As you
 * scroll on, the stage blurs, dims and shrinks back as the page transition.
 * The slideshow waits while off screen and stays on the first photo when
 * the visitor's device asks for reduced motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);
  const visible = useRef(true);

  useStageScroll(root, stage, (p) => {
    visible.current = p < 0.98;
  });

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setActive((a) => {
        setPrev(a);
        return (a + 1) % hero.slides.length;
      });
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section ref={root} id="top" className="relative h-svh min-h-[640px] overflow-hidden bg-ink" aria-label="Welcome">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {hero.slides.map((s, i) => {
          const on = i === active;
          const drifting = !reduced && (on || i === prev);
          return (
            <div
              key={s.photo.src}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${on ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={!on}
            >
              <Img
                photo={s.photo}
                eager={i === 0}
                fetchPriority={i === 0 ? 'high' : 'low'}
                className={`h-full w-full object-cover ${s.focus} ${drifting ? 'drift' : ''}`}
                style={{animationDuration: `${SLIDE_MS + 1800}ms`}}
              />
            </div>
          );
        })}
        {/* A light wash so the photos stay bright; the darkening sits behind the type only. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_20_16/0.62),rgb(8_20_16/0.18)_48%,transparent_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_75%_at_22%_55%,rgb(8_20_16/0.55),transparent_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_20_16/0.4),transparent_22%,transparent_78%,rgb(8_20_16/0.5))]" />
        {/* On phones the copy spans the full width, over the brightest part of the photo. */}
        <div className="absolute inset-0 bg-[rgb(8_20_16/0.3)] md:hidden" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(112px,15vh,150px)] md:px-14">
          <h1 className="display text-[clamp(46px,7.4vw,136px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.45)]">
            {hero.lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it' : ''} ${i === 0 ? 'pl-[1.2em]' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          <p className="caps mt-10 max-w-[340px] text-[12.5px] text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.6)] md:ml-[clamp(0px,19vw,330px)]">{hero.body}</p>
        </div>
      </div>

    </section>
  );
}
