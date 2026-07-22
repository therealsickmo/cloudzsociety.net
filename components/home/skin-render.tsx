'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * The Minecraft skin render on the right of the showcase card — as tall as
 * the card, anchored to the bottom-right, gently bobbing. Renders nothing if
 * the image is missing.
 */
export function SkinRender({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[46%] items-end justify-end md:flex">
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-full items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Minecraft Skin"
          onError={() => setOk(false)}
          className="h-[94%] w-auto object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </div>
  );
}
