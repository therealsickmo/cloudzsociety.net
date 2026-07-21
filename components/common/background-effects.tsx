'use client';

import { motion } from 'framer-motion';

/**
 * Fixed decorative background: soft aurora-style gradients and slow floating
 * orbs in the brand colour. No grid/tiling; a touch lighter than the base so
 * the page feels graphical rather than flat-dark.
 */
export function BackgroundEffects() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base lift — subtly lighter than the pure background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(140% 90% at 50% -10%, rgb(var(--brand-900) / 0.55) 0%, rgb(var(--surface) / 0.4) 35%, transparent 70%)',
        }}
      />

      {/* Aurora sweeps */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(50% 40% at 15% 20%, rgb(var(--brand-500) / 0.16), transparent 60%), radial-gradient(45% 45% at 85% 15%, rgb(var(--brand-400) / 0.14), transparent 60%), radial-gradient(55% 50% at 75% 85%, rgb(var(--brand-600) / 0.12), transparent 65%)',
        }}
      />

      {/* Top brand glow */}
      <div className="absolute -top-40 left-1/2 h-[38rem] w-[46rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[150px]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute left-[8%] top-[28%] h-72 w-72 rounded-full bg-brand/12 blur-[110px]"
        animate={{ y: [0, -40, 0], x: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[6%] top-[55%] h-80 w-80 rounded-full bg-brand-400/12 blur-[130px]"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[6%] left-[40%] h-64 w-64 rounded-full bg-brand-600/10 blur-[120px]"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
