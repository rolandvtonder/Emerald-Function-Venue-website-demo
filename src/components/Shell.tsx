import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {brand, hero, href, type PageId} from '../content';
import {interceptLinks, openCurtain, resetCurtain} from '../lib/nav';
import {lockScroll, onFrame, startScroll} from '../lib/scroll';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {Wordmark} from './Gem';
import {Menu} from './Menu';
import {Footer} from './Footer';

/**
 * Everything every page shares: the wordmark, the Menu button, the fixed
 * "Book a viewing" box, the slab menu, the footer, the page-change curtain
 * and the film grain. Pages only supply their own sections.
 */
export function Shell({page, children}: {page: PageId; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  // One observer for every [data-reveal] on the page, including ones mounted later.
  const reveals = useReveals<HTMLElement>();

  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => {
    openCurtain();
    const onShow = (e: PageTransitionEvent) => e.persisted && resetCurtain();
    window.addEventListener('pageshow', onShow);
    const stop = interceptLinks();
    return () => {
      stop();
      window.removeEventListener('pageshow', onShow);
    };
  }, []);
  useEffect(() => lockScroll(open), [open]);

  // Back the wordmark once the page has scrolled — read per frame, written to the DOM.
  const brandLink = useRef<HTMLAnchorElement>(null);
  useEffect(
    () =>
      onFrame(() => {
        brandLink.current?.classList.toggle('is-scrolled', window.scrollY > 60);
      }),
    [],
  );

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="caps fixed top-3 left-1/2 z-[80] -translate-x-1/2 -translate-y-[200%] bg-paper px-5 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <a
        ref={brandLink}
        href={href('home')}
        aria-label={`${brand.full} — home`}
        className="brand fixed top-3 left-2 z-[55] px-3 py-2 text-white md:top-5 md:left-11"
      >
        <Wordmark />
      </a>

      <button
        ref={menuButton}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ivory text-ink shadow-[0_0_0_1px_rgb(11_20_17/0.12)]' : 'bg-ink/45 text-white hover:bg-ink/65'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      {page !== 'contact' && (
        <a
          href={href('contact')}
          className={`caps fixed right-5 bottom-5 z-[55] px-7 py-4 shadow-[0_10px_30px_rgb(0_0_0/0.18)] transition-colors duration-500 md:right-8 md:bottom-7 ${
            open ? 'bg-emerald text-white' : 'bg-champagne text-ink hover:bg-ivory'
          }`}
        >
          {hero.book[0]} <em className="normal-case">{hero.book[1]}</em>
        </a>
      )}

      <main ref={reveals} id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      <Menu open={open} page={page} onClose={close} />

      <div className="curtain flex items-center justify-center bg-emerald text-champagne" aria-hidden>
        <Wordmark />
      </div>
      <div className="grain" aria-hidden />
    </>
  );
}
