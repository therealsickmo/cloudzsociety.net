'use client';

import { motion } from 'framer-motion';

// Fine grain (feTurbulence) to dither gradients so they don't band/pixelate.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Fixed decorative background: a slightly lifted base with very large, soft,
 * overlapping brand gradients (no visible circles) plus a subtle grain layer
 * to remove colour banding. Smooth and a touch lighter than pure black.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Lifted base wash — a bit lighter than pure background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--surface) / 0.85) 0%, rgb(var(--background)) 55%)',
        }}
      />

      {/* Large diffuse aurora gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(85% 60% at 18% 8%, rgb(var(--brand-500) / 0.16), transparent 72%), radial-gradient(80% 65% at 88% 18%, rgb(var(--brand-400) / 0.13), transparent 74%), radial-gradient(95% 75% at 60% 108%, rgb(var(--brand-600) / 0.16), transparent 78%)',
        }}
      />

      {/* Soft, very large moving glows (huge blur → no circle edges) */}
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[42rem] w-[42rem] rounded-full bg-brand/10 blur-[190px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-0 h-[44rem] w-[44rem] rounded-full bg-brand-400/10 blur-[200px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Grain overlay — kills banding / that "pixel" look */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-soft-light"
        style={{ backgroundImage: NOISE, backgroundSize: '120px 120px' }}
      />
    </div>
  );
}
