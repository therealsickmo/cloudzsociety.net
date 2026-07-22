'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useSettings } from '@/components/providers/settings-provider';

/**
 * Header brand: the CS.net logo + CLOUDZ™ wordmark.
 * - Hover: the whole brand scales up.
 * - Click: the logo darts right and "sucks in" the wordmark, then glides
 *   back to the left as the wordmark is spat out again. Always navigates Home.
 */
export function HeaderBrand() {
  const { site } = useSettings();
  const [imgOk, setImgOk] = useState(true);
  const logo = useAnimationControls();
  const word = useAnimationControls();
  const busy = useRef(false);

  async function play() {
    if (busy.current) return;
    busy.current = true;

    // Logo darts right and sucks the wordmark in.
    await Promise.all([
      logo.start({
        x: 26,
        transition: { duration: 0.24, ease: [0.4, 0, 0.2, 1] },
      }),
      word.start({
        x: -34,
        scaleX: 0,
        opacity: 0,
        transition: { duration: 0.24, ease: 'easeIn' },
      }),
    ]);

    // Logo glides back left, wordmark is spat back out.
    logo.start({
      x: 0,
      transition: { type: 'spring', stiffness: 420, damping: 20 },
    });
    await word.start({
      x: 0,
      scaleX: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 480, damping: 15 },
    });
    busy.current = false;
  }

  return (
    <Link
      href="/"
      onClick={play}
      aria-label={`${site.name} Startseite`}
      className="block"
    >
      <motion.span
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="flex items-center gap-2.5"
      >
        {imgOk ? (
          <motion.span animate={logo} className="block shrink-0">
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
          style={{ transformOrigin: 'left center' }}
          className="text-xl font-bold tracking-tight text-white"
        >
          {site.name}
        </motion.span>
      </motion.span>
    </Link>
  );
}
