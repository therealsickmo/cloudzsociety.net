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
      // Spawn a pixel particle, throttled.
      const now = performance.now();
      if (now - lastSpawn.current > 28) {
        lastSpawn.current = now;
        const id = idRef.current++;
        const p: Particle = {
          id,
          x: e.clientX,
          y: e.clientY,
          dx: (Math.random() - 0.5) * 26,
          dy: (Math.random() - 0.5) * 26,
        };
        setParticles((prev) => [...prev.slice(-22), p]);
        window.setTimeout(
          () => setParticles((prev) => prev.filter((q) => q.id !== id)),
          480,
        );
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      {/* Small fast glow */}
      <div
        ref={glowRef}
        className="absolute left-0 top-0 -ml-[75px] -mt-[75px] size-[150px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgb(var(--brand-500) / 0.22), transparent 70%)',
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
