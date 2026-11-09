import {prefersReducedMotion} from '../hooks/useReducedMotion';
import {scrollToHash} from './scroll';

/**
 * Page changes. Each section is a real page, so moving between them is a
 * normal navigation — dressed up with an emerald curtain that closes over the
 * old page and opens on the new one. A sessionStorage flag tells the new page
 * to start with the curtain closed; if storage is unavailable the new page
 * simply appears without it.
 */

const KEY = 'efv-curtain';
const CLOSE_MS = 650;

/** Call before the first render: start covered if we arrived via the curtain. */
export function markIncoming() {
  try {
    if (sessionStorage.getItem(KEY)) {
      sessionStorage.removeItem(KEY);
      if (!prefersReducedMotion()) document.documentElement.classList.add('curtain-in');
    }
  } catch {
    /* storage blocked: no curtain */
  }
}

const curtain = () => document.querySelector<HTMLElement>('.curtain');

/** Draws the curtain back on a page that arrived covered. */
export function openCurtain() {
  const html = document.documentElement;
  const c = curtain();
  if (!c || !html.classList.contains('curtain-in')) return;
  // A timer rather than rAF: frames can stall while the new page is still
  // loading, and the curtain must never stay shut over the content.
  window.setTimeout(() => {
    c.classList.add('is-opening');
    window.setTimeout(() => {
      html.classList.remove('curtain-in');
      c.classList.remove('is-opening');
    }, 800);
  }, 120);
}

/** Restores a page shown from the back/forward cache with the curtain still closed. */
export function resetCurtain() {
  document.documentElement.classList.remove('curtain-in');
  curtain()?.classList.remove('is-closing', 'is-opening');
}

export function go(href: string) {
  if (prefersReducedMotion()) {
    window.location.href = href;
    return;
  }
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* fine — the next page just won't animate in */
  }
  curtain()?.classList.add('is-closing');
  window.setTimeout(() => {
    window.location.href = href;
  }, CLOSE_MS);
}

/**
 * One document-level click handler: internal links to another page get the
 * curtain, in-page hashes get a smooth scroll, everything else (new tabs,
 * modified clicks, tel:, mailto:, external sites) behaves normally.
 */
export function interceptLinks(): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    const samePage = url.pathname === window.location.pathname;
    if (samePage && url.hash) {
      e.preventDefault();
      scrollToHash(url.hash);
      return;
    }
    if (samePage) {
      e.preventDefault();
      scrollToHash('#top');
      return;
    }
    e.preventDefault();
    go(url.href);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
