'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-reveal wrapper for a showcase card: all cards glide in from the left
 * and "park" next to each other one after another when the row enters view.
 * The order is right-to-left — the last card parks first, then the middle,
 * then the first. Keeps the card content server-rendered (as children).
 */
export function RevealCard({
  children,
  index,
  total,
}: {
  children: ReactNode;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -240, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{
        duration: 0.7,
        delay: (total - 1 - index) * 0.22,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
