'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';
import { useSettings } from '@/components/providers/settings-provider';

/**
 * Header brand: the CS.net logo (links home) + the CLOUDZ™ wordmark.
 * Both grow a little on hover. Clicking the wordmark plays a playful
 * "vacuum" animation — the logo slides right, sucks the wordmark in,
 * slides back and spits it out again.
 */
export function HeaderBrand() {
  const { site } = useSettings();
  const [imgOk, setImgOk] = useState(true);
  const [busy, setBusy] = useState(false);
  const logo = useAnimationControls();
  const text = useAnimationControls();

  async function play() {
    if (busy) return;
    setBusy(true);
    // Suck: logo slides right toward the wordmark, wordmark gets pulled in.
    await Promise.all([
      logo.start({ x: 14, transition: { duration: 0.18, ease: 'easeIn' } }),
      text.start({
        x: -24,
        scale: 0,
        opacity: 0,
        transition: { duration: 0.22, ease: 'easeIn' },
      }),
    ]);
    // Return: logo slides back to its place.
    await logo.start({ x: 0, transition: { duration: 0.2, ease: 'easeOut' } });
    // Spit: the wordmark springs back out with a little overshoot.
    await text.start({
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', stiffness: 480, damping: 12 },
    });
    setBusy(false);
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex items-center gap-2.5"
    >
      <Link href="/" aria-label={`${site.name} Startseite`} className="shrink-0">
        <motion.span animate={logo} className="block">
          {imgOk ? (
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
          ) : (
            <span className="text-xl font-bold text-white">{site.name}</span>
          )}
        </motion.span>
      </Link>

      <motion.button
        type="button"
        onClick={play}
        animate={text}
        aria-label={`${site.name} Animation abspielen`}
        className="origin-left cursor-pointer text-xl font-bold tracking-tight text-white"
      >
        {site.name}
      </motion.button>
    </motion.span>
  );
}
