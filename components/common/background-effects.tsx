'use client';

import { motion } from 'framer-motion';

/**
 * Fixed decorative background: subtle grid, radial glows and slow floating
 * orbs. Purely aesthetic and non-interactive.
 */
export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Top brand glow */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute left-[10%] top-[30%] h-72 w-72 rounded-full bg-brand/10 blur-[100px]"
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[8%] top-[55%] h-80 w-80 rounded-full bg-brand-400/10 blur-[120px]"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
