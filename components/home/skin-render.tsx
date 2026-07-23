'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * The Minecraft skin render — larger than its column so it breaks out over
 * the top edge and tucks its feet below (behind the next card). Gently bobs.
 * Renders nothing if the image is missing.
 */
export function CardSkin({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok || !src) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-12 flex items-end justify-center">
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
          className="h-[96%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </div>
  );
}
