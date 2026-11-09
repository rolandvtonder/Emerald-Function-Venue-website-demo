import {useEffect, useRef, type CSSProperties, type ReactNode} from 'react';
import {contact, cta, href, intro, strip, whatsappLink, type Photo} from '../content';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useStageScroll} from '../hooks/useStageScroll';
import {Gem} from './Gem';
import {Img} from './Img';

type Line = {t: string; i?: boolean};

/** Display headline lines; `i` lines are italic. Each line rises in turn. */
export function Lines({lines, className = '', as: Tag = 'h2', reveal = true}: {lines: Line[]; className?: string; as?: 'h1' | 'h2' | 'h3'; reveal?: boolean}) {
  return (
    <Tag className={`display ${className}`}>
      {lines.map((l, i) => (
        <span
          key={l.t}
          className={`block ${l.i ? 'it' : ''}`}
          data-reveal={reveal ? '' : undefined}
          style={reveal ? ({'--d': `${i * 90}ms`} as CSSProperties) : undefined}
        >
          {l.t}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({n, children, light = false}: {n?: string; children: ReactNode; light?: boolean}) {
  return (
    <p className={`caps flex items-center gap-3 ${light ? 'text-gold' : 'text-champagne'}`} data-reveal="">
      <Gem className="size-4" />
      {n && <span>{n}</span>}
      {n && <span aria-hidden className="h-px w-8 bg-current opacity-60" />}
      <span>{children}</span>
    </p>
  );
}

const btn = {
  solid: 'caps inline-flex min-h-12 items-center justify-center gap-3 bg-champagne px-7 py-3.5 text-ink transition-colors duration-300 hover:bg-ivory',
  dark: 'caps inline-flex min-h-12 items-center justify-center gap-3 bg-emerald px-7 py-3.5 text-white transition-colors duration-300 hover:bg-emerald-deep',
  ghost: 'caps inline-flex min-h-12 items-center justify-center gap-3 border border-white/40 px-7 py-3.5 text-white transition-colors duration-300 hover:border-champagne hover:text-champagne',
};
export {btn};

/* ------------------------------------------------------------- page hero */

/** Inner-page hero: one photo with a slow settle, the page's headline, and the same pull-back on scroll. */
export function PageHero({eyebrow, lines, photo, n}: {eyebrow: string; lines: Line[]; photo: Photo; n: string}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useStageScroll(root, stage);

  return (
    <section ref={root} id="top" className="relative h-[92svh] min-h-[600px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <Img photo={photo} eager fetchPriority="high" className="drift h-full w-full object-cover [animation-duration:14s]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_20_16/0.8),rgb(8_20_16/0.3)_60%,rgb(8_20_16/0.15))]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_20_16/0.5),transparent_35%,transparent_65%,rgb(8_20_16/0.6))]" />
        <div className="absolute inset-0 bg-[rgb(8_20_16/0.3)] md:hidden" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(96px,14vh,140px)] md:px-14">
          <Eyebrow n={n}>{eyebrow}</Eyebrow>
          <Lines as="h1" lines={lines} className="mt-6 text-[clamp(46px,7.2vw,132px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- statement */

/** A large, quiet paragraph on ivory that opens each inner page. */
export function Statement({children}: {children: ReactNode}) {
  return (
    <section className="on-light bg-paper px-5 py-[clamp(80px,14vh,160px)] text-ink md:px-14">
      <p data-reveal="" className="mx-auto max-w-[1100px] text-[clamp(26px,3vw,46px)] leading-[1.22] tracking-[-0.005em]">
        {children}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------ home intro */

export function Intro() {
  return (
    <section className="on-light bg-paper px-5 py-[clamp(88px,15vh,180px)] text-ink md:px-14">
      <div className="mx-auto grid max-w-[1680px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div>
          <Eyebrow light>{intro.eyebrow}</Eyebrow>
          <Lines lines={intro.lines} className="mt-7 text-[clamp(42px,5.4vw,96px)] text-ink" />
          <p data-reveal="" className="prose-body mt-10 max-w-[56ch] text-ink/80">
            {intro.body}
          </p>
          <ul data-reveal="" className="mt-10 grid max-w-[620px] grid-cols-1 border-t border-line sm:grid-cols-2">
            {intro.facts.map((f) => (
              <li key={f} className="caps flex items-center gap-3 border-b border-line py-4 text-ink/85 sm:odd:pr-6">
                <Gem className="size-4 shrink-0 text-emerald" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div data-reveal="photo" className="aspect-[4/5] overflow-hidden">
            <Img photo={intro.photo} sizes="(max-width: 1023px) 100vw, 42vw" className="h-full w-full object-cover" />
          </div>
          <p className="caps mt-4 text-ink/60">The hall, dressed for a reception</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- photo strip */

/** A row of photographs that drifts sideways as you scroll past it. */
export function Strip({photos = strip}: {photos?: Photo[]}) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    return onFrame(() => {
      const el = root.current;
      const t = track.current;
      if (!el || !t) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = clamp((vh - r.top) / (vh + r.height));
      const travel = Math.max(0, t.scrollWidth - el.clientWidth);
      t.style.transform = `translate3d(${(-p * travel).toFixed(1)}px, 0, 0)`;
    });
  }, [reduced]);

  return (
    <section ref={root} className={`bg-ink py-[3px] ${reduced ? 'overflow-x-auto' : 'overflow-hidden'}`} aria-label="Moments at Emerald">
      <div ref={track} className="flex w-max gap-[3px] will-change-transform">
        {photos.map((ph) => (
          <div key={ph.src} className="h-[clamp(240px,42vh,460px)] shrink-0 overflow-hidden" style={{aspectRatio: `${ph.w} / ${ph.h}`}}>
            <Img photo={ph} sizes="50vw" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- call to act */

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-emerald px-5 py-[clamp(96px,16vh,190px)] text-white md:px-14">
      <Gem className="pointer-events-none absolute -right-[8vw] -bottom-[14vw] size-[52vw] max-w-[760px] max-h-[760px] text-white/[0.06]" />
      <div className="relative mx-auto max-w-[1680px]">
        <Eyebrow>Availability</Eyebrow>
        <Lines lines={cta.lines} className="mt-7 text-[clamp(56px,9vw,170px)]" />
        <p data-reveal="" className="prose-body mt-10 max-w-[48ch] text-white/85">
          {cta.body}
        </p>
        <div data-reveal="" className="mt-10 flex flex-wrap gap-3">
          <a href={href('contact')} className={btn.solid}>
            Send an enquiry
          </a>
          <a href={whatsappLink('Hi Emerald, I would like to check a date for an event.')} target="_blank" rel="noopener" className={btn.ghost}>
            WhatsApp us
          </a>
          <a href={contact.phoneHref} className={btn.ghost}>
            Call {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- chapter */

/** Numbered text beside a pair of photographs; alternates sides down the page. */
export function Chapter({n, title, body, photos, flip = false}: {n: string; title: [string, string]; body: string; photos: Photo[]; flip?: boolean}) {
  const [a, b] = photos;
  return (
    <section className="on-light bg-paper px-5 py-[clamp(64px,11vh,130px)] text-ink md:px-14">
      <div className={`mx-auto grid max-w-[1680px] items-center gap-12 lg:grid-cols-2 lg:gap-24 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="relative pb-[18%]">
          <div data-reveal="photo" className="aspect-[4/3] w-[86%] overflow-hidden">
            <Img photo={a} sizes="(max-width: 1023px) 86vw, 42vw" className="h-full w-full object-cover" />
          </div>
          {b && (
            <div
              data-reveal="photo"
              style={{'--d': '250ms'} as CSSProperties}
              className="absolute right-0 bottom-0 aspect-[4/5] w-[40%] overflow-hidden border-[6px] border-paper"
            >
              <Img photo={b} sizes="(max-width: 1023px) 40vw, 18vw" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
        <div className="lg:px-6">
          <p data-reveal="" className="caps text-gold">
            {n}
          </p>
          <h2 className="display mt-5 text-[clamp(48px,6vw,108px)]" data-reveal="">
            <span className="block">{title[0]}</span>
            <span className="it block text-emerald">{title[1]}</span>
          </h2>
          <p data-reveal="" className="prose-body mt-8 max-w-[46ch] text-ink/80">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- steps */

export function Steps({title, steps}: {title: Line[]; steps: [string, string][]}) {
  return (
    <section className="bg-ink px-5 py-[clamp(80px,13vh,150px)] text-white md:px-14">
      <div className="mx-auto max-w-[1680px]">
        <Lines lines={title} className="text-[clamp(42px,5vw,88px)]" />
        <ol className="mt-14 grid gap-[3px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} data-reveal="" style={{'--d': `${i * 120}ms`} as CSSProperties} className="bg-white/[0.04] p-7 md:p-9">
              <span className="display it text-[56px] text-champagne">0{i + 1}</span>
              <h3 className="display mt-6 text-[28px]">{t}</h3>
              <p className="prose-body mt-3 text-white/75">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
