import React, { useMemo } from 'react';

/**
 * InteractiveBackground generates a rich field of floating glowing particles,
 * plus a swarm of particles that strictly follow the mouse coordinate.
 * Transforms shapes beautifully per-story theme.
 */
export default function InteractiveBackground({ theme }) {
  // Generate random floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 5 + 3; // 3px to 8px
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const px = (Math.random() - 0.5) * 500; 
      const py = (Math.random() - 0.5) * 500;
      const duration = Math.random() * 6 + 4;
      const delay = Math.random() * -10;

      return {
        id: i,
        size,
        left: `${left}%`,
        top: `${top}%`,
        px: `${px}px`,
        py: `${py}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, []);

  return (
    <div className={`interactive-bg ${theme ? `interactive-bg--${theme}` : ''}`} aria-hidden="true">
      {/* Drifting Background Elements */}
      {particles.map(p => (
        <div
          key={p.id}
          className="interactive-particle-wrapper"
          style={{
            left: p.left,
            top: p.top,
            '--px': p.px,
            '--py': p.py,
          }}
        >
          <div
            className="interactive-particle"
            style={{
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        </div>
      ))}
      
      {/* Mouse Follower Swarm */}
      <div className="mouse-swarm">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={`swarm-${i}`} className={`mouse-swarm-node mouse-swarm-node--${i}`} />
        ))}
      </div>
    </div>
  );
}
