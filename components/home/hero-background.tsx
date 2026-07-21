'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Parallax hero background. Shows public/images/hero-bg.jpg (if present),
 * darkened so the logo, cards and buttons pop. The image shifts subtly with
 * the pointer for a spatial / 3D feel. Gracefully shows nothing (just the
 * dark base) when the image file is missing.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Normalised pointer offset from the section centre (-0.5 … 0.5).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 50, damping: 18, mass: 0.6 });

  // Background moves opposite to the pointer (depth).
  const bgX = useTransform(sx, [-0.5, 0.5], [28, -28]);
  const bgY = useTransform(sy, [-0.5, 0.5], [28, -28]);

  useEffect(() => {
    const section = rootRef.current?.parentElement;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [px, py]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Parallax image layer (scaled up so edges never show while shifting) */}
      <motion.div
        style={{ x: bgX, y: bgY, scale: 1.14 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/cloudz-banner-leer.png')" }}
        />
      </motion.div>

      {/* Darkening + brand glow overlays */}
      <div className="absolute inset-0 bg-background/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/45 to-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(0,102,255,0.18), transparent 60%)',
        }}
      />
    </div>
  );
}
