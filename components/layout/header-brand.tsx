'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useSettings } from '@/components/providers/settings-provider';

/**
 * Header brand: the CS.net logo + CLOUDZ™ wordmark. On hover the logo grows
 * and the wordmark is pulled in towards the logo, then spat back out with a
 * springy overshoot. Clicking always navigates to Home.
 */
export function HeaderBrand() {
  const { site } = useSettings();
  const [imgOk, setImgOk] = useState(true);
  const [hovered, setHovered] = useState(false);
  const word = useAnimationControls();
  const busy = useRef(false);

  async function onEnter() {
    setHovered(true);
    if (busy.current) return;
    busy.current = true;
    // Pull the wordmark in towards the logo…
    await word.start({
      x: -22,
      opacity: 0,
      transition: { duration: 0.16, ease: 'easeIn' },
    });
    // …then spit it back out with a bouncy overshoot.
    await word.start({
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 520, damping: 12 },
    });
    busy.current = false;
  }

  return (
    <Link
      href="/"
      aria-label={`${site.name} Startseite`}
      onMouseEnter={onEnter}
      onMouseLeave={() => setHovered(false)}
      className="block"
    >
      <span className="flex items-center gap-2.5 overflow-hidden">
        {imgOk ? (
          <motion.span
            animate={{ scale: hovered ? 1.22 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 16 }}
            className="block shrink-0"
          >
            <Image
              src="/logo/cloudz-logo.png"
              alt={site.name}
              width={72}
              height={72}
              priority
              unoptimized
              onError={() => setImgOk(false)}
              className="h-12 w-auto drop-shadow-[0_0_12px_rgba(0,102,255,0.5)]"
            />
          </motion.span>
        ) : null}
        <motion.span
          animate={word}
          className="text-xl font-bold tracking-tight text-white"
        >
          {site.name}
        </motion.span>
      </span>
    </Link>
  );
}
