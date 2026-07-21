'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { slideUp, viewportOnce } from '@/lib/animations';

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

/** Scroll-reveal wrapper — animates its children in once on view. */
export function Reveal({
  children,
  variants = slideUp,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
