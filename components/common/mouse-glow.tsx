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
}

/**
 * A small, fast glow that tracks the cursor tightly, plus little pixel
 * particles that spawn on movement and quickly fade away. Desktop only.
 */
export function MouseGlow() {
  const mounted = useMounted();
  const glowRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // Glow follows instantly via direct DOM write (no re-render, no lag).
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      // Spawn pixel particles, throttled — spawn a couple each time.
      const now = performance.now();
      if (now - lastSpawn.current > 16) {
        lastSpawn.current = now;
        const spawned: Particle[] = [];
        for (let k = 0; k < 2; k++) {
          const id = idRef.current++;
          spawned.push({
            id,
            x: e.clientX,
            y: e.clientY,
            dx: (Math.random() - 0.5) * 34,
            dy: (Math.random() - 0.5) * 34,
          });
        }
        setParticles((prev) => [...prev.slice(-46), ...spawned]);
        const ids = spawned.map((s) => s.id);
        window.setTimeout(
          () => setParticles((prev) => prev.filter((q) => !ids.includes(q.id))),
          540,
        );
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      {/* Fast-following glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -ml-[115px] -mt-[115px] size-[230px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--brand-500) / 0.24), transparent 70%)',
        }}
      />

      {/* Pixel particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.9, scale: 1, x: p.x - 3, y: p.y - 3 }}
            animate={{ opacity: 0, scale: 0.3, x: p.x - 3 + p.dx, y: p.y - 3 + p.dy }}
            transition={{ duration: 0.46, ease: 'easeOut' }}
            className="absolute left-0 top-0 size-1.5 rounded-[1px] bg-brand-300 shadow-[0_0_4px_rgb(var(--brand-400))]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
