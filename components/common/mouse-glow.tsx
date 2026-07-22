'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMounted } from '@/hooks/use-mounted';

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

/**
 * Minecraft-style blocky pixel particles that trail the cursor and drift
 * away smoothly. Desktop only.
 */
export function MouseGlow() {
  const mounted = useMounted();
  const lastSpawn = useRef(0);
  const idRef = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current > 22) {
        lastSpawn.current = now;
        const spawned: Particle[] = [];
        for (let k = 0; k < 2; k++) {
          const id = idRef.current++;
          // Blocky sizes (multiples of 3px) for a pixel/Minecraft look.
          const size = 3 * (2 + Math.floor(Math.random() * 3)); // 6, 9 or 12px
          spawned.push({
            id,
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            dx: (Math.random() - 0.5) * 22,
            dy: 10 + Math.random() * 26, // gentle downward drift (gravity)
            size,
          });
        }
        setParticles((prev) => [...prev.slice(-56), ...spawned]);
        const ids = spawned.map((s) => s.id);
        window.setTimeout(
          () => setParticles((prev) => prev.filter((q) => !ids.includes(q.id))),
          760,
        );
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.95, scale: 1, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 0.55,
              x: p.x + p.dx,
              y: p.y + p.dy,
            }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: p.size, height: p.size }}
            className="absolute left-0 top-0 bg-brand-400 shadow-[0_0_5px_rgb(var(--brand-500)/0.8)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
