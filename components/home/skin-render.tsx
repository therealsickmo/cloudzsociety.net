'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * The Minecraft skin render on the right of the showcase card — large,
 * breaking out over the top edge, anchored bottom-right, gently bobbing.
 * Renders nothing if the image is missing.
 */
export function SkinRender({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <div className="pointer-events-none absolute bottom-0 right-2 z-20 hidden h-full items-end md:flex lg:right-6">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-full items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Minecraft Skin"
          onError={() => setOk(false)}
          className="h-[132%] w-auto object-contain object-bottom drop-shadow-[0_24px_50px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </div>
  );
}
