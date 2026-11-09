import {useEffect, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The camera pull-back: as a hero scrolls away, its stage drifts down, blurs,
 * dims and shrinks a little. Read from the shared rAF loop and written straight
 * to the element — no React state while scrolling.
 */
export function useStageScroll(root: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, onProgress?: (p: number) => void) {
  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const h = window.innerHeight;
        // When the hero is taller than the screen (stacked on phones), only start
        // pulling back once all of it has been seen.
        const p = clamp((-r.top - Math.max(0, r.height - h)) / h);
        onProgress?.(p);
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    // Refs are stable; the callback is read once on mount by design.
    [],
  );
}
