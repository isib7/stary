import { useEffect, useRef } from 'react';

/**
 * Drives --mx, --my CSS custom properties on :root for parallax backgrounds.
 */
export function useMouseParallax() {
  const rafRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;

    const onMove = (e) => {
      if (rafRef.current) return; // throttle to 1 rAF per move
      rafRef.current = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        root.style.setProperty('--mx', x.toFixed(4));
        root.style.setProperty('--my', y.toFixed(4));
        root.style.setProperty('--clientX', `${e.clientX}px`);
        root.style.setProperty('--clientY', `${e.clientY}px`);
        rafRef.current = null;
      });
    };

    const onTouch = (e) => {
      if (!e.touches[0]) return;
      onMove(e.touches[0]);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);
}
