'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * The Minecraft skin render — fills its (relative) column, anchored to the
 * bottom, gently bobbing. Renders nothing if the image is missing.
 */
export function CardSkin({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok || !src) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-full items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Minecraft Skin"
          onError={() => setOk(false)}
          className="h-[94%] w-auto max-w-full object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </div>
  );
}
