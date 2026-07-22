'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * The floating Minecraft skin render that breaks out of the showcase card.
 * Gently bobs up and down; renders nothing if the image is missing.
 */
export function SkinRender({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute -right-4 bottom-0 z-20 w-[280px] sm:w-[340px] lg:-right-6 lg:-top-16 lg:w-[420px]"
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src={src}
          alt="Minecraft Skin"
          width={480}
          height={480}
          unoptimized
          onError={() => setOk(false)}
          className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}
