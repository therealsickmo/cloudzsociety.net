'use client';

import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/use-mouse-position';
import { useMounted } from '@/hooks/use-mounted';

/**
 * A soft brand-coloured glow that follows the cursor. Fixed, non-interactive
 * and hidden on touch devices where a pointer isn't meaningful.
 */
export function MouseGlow() {
  const { x, y } = useMousePosition();
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      animate={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,102,255,0.06), transparent 75%)`,
      }}
      transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
    />
  );
}
