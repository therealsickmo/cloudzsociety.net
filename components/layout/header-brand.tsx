'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useSettings } from '@/components/providers/settings-provider';

interface Bit {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

/**
 * Header brand: the CS.net logo + CLOUDZ™ wordmark. Both grow on hover.
 * Clicking always navigates home and plays a pixel-dissolve on the logo —
 * it scatters into pixels, disappears and reappears.
 */
export function HeaderBrand() {
  const { site } = useSettings();
  const [imgOk, setImgOk] = useState(true);
  const [bits, setBits] = useState<Bit[]>([]);
  const boxRef = useRef<HTMLSpanElement>(null);
  const idRef = useRef(0);
  const busy = useRef(false);
  const logo = useAnimationControls();

  async function play() {
    if (busy.current) return;
    busy.current = true;

    // Scatter pixel bits across the logo's area.
    const rect = boxRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 48;
    const h = rect?.height ?? 48;
    const spawned: Bit[] = [];
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 18 + Math.random() * 46;
      spawned.push({
        id: idRef.current++,
        x: Math.random() * w,
        y: Math.random() * h,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
      });
    }
    setBits(spawned);

    // Dissolve the logo…
    await logo.start({
      opacity: 0,
      scale: 0.82,
      filter: 'blur(2px)',
      transition: { duration: 0.22, ease: 'easeIn' },
    });
    window.setTimeout(() => setBits([]), 520);

    // …then reappear.
    await new Promise((r) => setTimeout(r, 130));
    await logo.start({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.3, ease: 'easeOut' },
    });
    busy.current = false;
  }

  return (
    <Link
      href="/"
      onClick={play}
      aria-label={`${site.name} Startseite`}
      className="flex items-center gap-2.5"
    >
      <motion.span
        ref={boxRef}
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative block shrink-0"
      >
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

        {/* Pixel bits */}
        <AnimatePresence>
          {bits.map((b) => (
            <motion.span
              key={b.id}
              initial={{ opacity: 1, x: b.x, y: b.y, scale: 1 }}
              animate={{ opacity: 0, x: b.x + b.dx, y: b.y + b.dy, scale: 0.35 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-none absolute left-0 top-0 size-1.5 rounded-[1px] bg-brand-300 shadow-[0_0_4px_rgb(var(--brand-400))]"
            />
          ))}
        </AnimatePresence>
      </motion.span>

      <motion.span
        whileHover={{ scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="text-xl font-bold tracking-tight text-white"
      >
        {site.name}
      </motion.span>
    </Link>
  );
}
