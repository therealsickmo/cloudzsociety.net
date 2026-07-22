'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * The Minecraft skin render inside a showcase card — smaller, anchored to the
 * bottom-left, gently bobbing. Renders nothing if the image is missing.
 */
export function CardSkin({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok || !src) return null;

  return (
    <div className="pointer-events-none absolute bottom-4 left-3 z-20 flex h-[54%] items-end">
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
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </div>
  );
}
