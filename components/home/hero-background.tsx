'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSettings } from '@/components/providers/settings-provider';

/**
 * Parallax hero background. Shows public/images/hero-bg.jpg (if present),
 * darkened so the logo, cards and buttons pop. The image shifts subtly with
 * the pointer for a spatial / 3D feel. Gracefully shows nothing (just the
 * dark base) when the image file is missing.
 */
export function HeroBackground() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { layout } = useSettings();
  const overlay = Math.min(0.95, Math.max(0, (layout.heroOverlay ?? 55) / 100));

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
          style={{
            backgroundImage: `url('${layout.heroBackground || '/images/cloudz-banner-leer.png'}')`,
          }}
        />
      </motion.div>

      {/* Even darkening */}
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlay }}
      />
      {/* Blue tint so the image matches the monochrome blue theme */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgb(var(--brand-900) / 0.45)' }}
      />
      {/* Brand glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 34%, rgb(var(--brand-500) / 0.22), transparent 60%)',
        }}
      />
      {/* Long, smooth vertical blend so the image melts into the page
          background instead of ending in a hard cut */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgb(var(--background)) 0%, transparent 14%, transparent 40%, rgb(var(--background) / 0.75) 72%, rgb(var(--background)) 92%)',
        }}
      />
    </div>
  );
}
