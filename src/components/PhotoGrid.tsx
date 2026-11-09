import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import type {Photo} from '../content';
import {lockScroll} from '../lib/scroll';
import {Img, large} from './Img';

/**
 * A masonry of photographs; any one opens full screen. The viewer is a modal
 * dialog: arrow keys and the on-screen buttons move through the set, Escape
 * closes it, and focus returns to the photo that opened it.
 */
export function PhotoGrid({photos, cols = 'columns-2 md:columns-3', light = true}: {photos: Photo[]; cols?: string; light?: boolean}) {
  const [open, setOpen] = useState(-1);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpen(-1);
    opener.current?.focus();
  }, []);

  return (
    <>
      <ul className={`${cols} gap-3 md:gap-4`}>
        {photos.map((ph, i) => (
          <li key={ph.src} className="mb-3 break-inside-avoid md:mb-4" data-reveal="" style={{'--d': `${(i % 3) * 90}ms`} as CSSProperties}>
            <button
              type="button"
              onClick={(e) => {
                opener.current = e.currentTarget;
                setOpen(i);
              }}
              className={`group block w-full cursor-zoom-in overflow-hidden ${light ? 'bg-line' : 'bg-white/5'}`}
              aria-label={`View larger: ${ph.alt}`}
            >
              <Img
                photo={ph}
                sizes="(max-width: 767px) 50vw, 33vw"
                className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>
      {open >= 0 && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />}
    </>
  );
}

function Lightbox({photos, index, onIndex, onClose}: {photos: Photo[]; index: number; onIndex: (i: number) => void; onClose: () => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const n = photos.length;
  const ph = photos[index];
  const step = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

  useEffect(() => {
    lockScroll(true);
    closeBtn.current?.focus();
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog.
        const f = dialog.current?.querySelectorAll<HTMLElement>('button');
        if (!f?.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, step]);

  const ctl = 'caps flex min-h-12 min-w-12 cursor-pointer items-center justify-center gap-2 px-4 text-white/85 hover:text-champagne';

  return (
    <div ref={dialog} role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[65] flex flex-col bg-ink/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 pt-3 md:px-6 md:pt-5">
        <p className="caps px-2 text-white/70" aria-live="polite">
          {index + 1} / {n}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className={ctl}>
          Close
          <span aria-hidden className="rotate-45 text-[20px] leading-none">+</span>
        </button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-2 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={ph.src} src={large(ph)} alt={ph.alt} width={ph.w} height={ph.h} className="max-h-[calc(100svh-170px)] w-auto max-w-full object-contain" />
        <figcaption className="prose-body mt-3 max-w-[60ch] px-2 text-center text-[15px] text-white/75">{ph.alt}</figcaption>
      </figure>
      <div className="flex items-center justify-center gap-6 pb-4 md:pb-6">
        <button type="button" onClick={() => step(-1)} className={ctl} aria-label="Previous photo">
          <Arrow flip /> <span aria-hidden>Prev</span>
        </button>
        <button type="button" onClick={() => step(1)} className={ctl} aria-label="Next photo">
          <span aria-hidden>Next</span> <Arrow />
        </button>
      </div>
    </div>
  );
}

function Arrow({flip = false}: {flip?: boolean}) {
  return (
    <svg viewBox="0 0 24 12" className={`h-3 w-6 ${flip ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden>
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}
