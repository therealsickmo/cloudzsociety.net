'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper for a showcase card: glides in from the left or the
 * right (alternating) with a fade + slight zoom, once, when it enters view.
 * Keeps the card content server-rendered (passed as children).
 */
export function RevealCard({
  children,
  fromLeft,
}: {
  children: ReactNode;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -140 : 140, scale: 0.94 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
