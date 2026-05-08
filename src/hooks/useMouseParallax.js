import { useEffect, useRef } from 'react';

/**
 * Drives --mx, --my CSS custom properties on :root for parallax backgrounds.
 * Continuously animates even when the mouse is idle.
 */
export function useMouseParallax() {
  const rafRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Initialize center values safely on client
    if (!initialized.current) {
      target.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      initialized.current = true;
    }

    let time = 0;

    const loop = () => {
      time += 0.005;
      
      // Continuous drifting animation (lissajous curve)
      const driftX = Math.sin(time) * (window.innerWidth * 0.15); 
      const driftY = Math.cos(time * 0.8) * (window.innerHeight * 0.15);

      // Smooth interpolation towards mouse position
      current.current.x += (target.current.x - current.current.x) * 0.05;
      current.current.y += (target.current.y - current.current.y) * 0.05;

      const finalX = current.current.x + driftX;
      const finalY = current.current.y + driftY;

      const mx = finalX / window.innerWidth;
      const my = finalY / window.innerHeight;

      root.style.setProperty('--mx', mx.toFixed(4));
      root.style.setProperty('--my', my.toFixed(4));
      root.style.setProperty('--clientX', `${finalX}px`);
      root.style.setProperty('--clientY', `${finalY}px`);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onTouch = (e) => {
      if (!e.touches[0]) return;
      target.current.x = e.touches[0].clientX;
      target.current.y = e.touches[0].clientY;
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
