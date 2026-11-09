import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {contact, pages, whatsappLink, type PageId} from '../content';

/**
 * The menu: three slabs wipe in from the right one after another
 * (emerald, champagne, ivory); the ivory one stays and holds the pages.
 * Hovering a page name ripples it like silk draping catching a breeze —
 * an SVG turbulence + displacement filter animated per frame.
 */
export function Menu({open, page, onClose}: {open: boolean; page: PageId; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 8).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: emerald → champagne → ivory, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away, with a soft dim over the page */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-emerald')} style={delay(0)} />
      <div className={slab('bg-champagne')} style={delay(1)} />
      <nav
        className={slab('on-light flex flex-col justify-between overflow-y-auto bg-ivory px-8 pt-28 pb-28 text-ink md:px-10 md:pb-10')}
        style={delay(2)}
        aria-label="Main menu"
      >
        <ul onMouseLeave={() => setHover(-1)}>
          {pages.map((p, i) => {
            const current = p.id === page;
            return (
              <li
                key={p.id}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={p.href}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onClick={(e) => {
                    if (current) {
                      e.preventDefault();
                      onClose();
                    }
                  }}
                  className={`display relative inline-block py-1 text-[clamp(34px,3.2vw,50px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-40' : 'opacity-100'
                  } ${current ? 'it text-emerald' : ''}`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {p.label}
                  <sup className="caps absolute -right-7 top-2 text-[10px] tracking-normal text-ink/50">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-12 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-ink/60">Talk to us</p>
          <a href={contact.phoneHref} className="display mt-2 block text-[28px] hover:text-emerald">
            {contact.phone}
          </a>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <a href={whatsappLink()} target="_blank" rel="noopener" className="caps py-1 text-ink/80 hover:text-emerald">
              WhatsApp
            </a>
            <a href={`mailto:${contact.email}`} className="caps py-1 text-ink/80 hover:text-emerald">
              Email
            </a>
            <a href={contact.facebook} target="_blank" rel="noopener" className="caps py-1 text-ink/80 hover:text-emerald">
              Facebook
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
