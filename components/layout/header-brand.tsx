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
  size: number;
}

/**
 * Header brand: the CS.net logo + CLOUDZ™ wordmark. Both grow on hover.
 * Clicking always navigates home and plays a pixel-dissolve on the whole
 * brand (logo + wordmark) — it scatters into pixels, disappears, reappears.
 */
export function HeaderBrand() {
  const { site } = useSettings();
  const [imgOk, setImgOk] = useState(true);
  const [bits, setBits] = useState<Bit[]>([]);
  const boxRef = useRef<HTMLSpanElement>(null);
  const idRef = useRef(0);
  const busy = useRef(false);
  const content = useAnimationControls();

  async function play() {
    if (busy.current) return;
    busy.current = true;

    // Break the brand into a grid of blocky pixels that scatter outward.
    const rect = boxRef.current?.getBoundingClientRect();
    const w = rect?.width ?? 160;
    const h = rect?.height ?? 48;
    const cell = 9; // pixel block size (Minecraft-ish)
    const cols = Math.max(1, Math.round(w / cell));
    const rows = Math.max(1, Math.round(h / cell));
    const cx = w / 2;
    const cy = h / 2;
    const spawned: Bit[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * cell + (Math.random() - 0.5) * 3;
        const y = r * cell + (Math.random() - 0.5) * 3;
        // Drift outward from the centre + a little randomness.
        const dirX = (x - cx) / cx;
        const dirY = (y - cy) / cy;
        const spread = 26 + Math.random() * 40;
        spawned.push({
          id: idRef.current++,
          x,
          y,
          dx: dirX * spread + (Math.random() - 0.5) * 18,
          dy: dirY * spread + (Math.random() - 0.5) * 18 + 10,
          size: cell - 1,
        });
      }
    }
    setBits(spawned);

    // Dissolve smoothly (no scale → no "jump"): the logo just fades and
    // softens while the pixels drift away.
    await content.start({
      opacity: 0,
      filter: 'blur(3px)',
      transition: { duration: 0.42, ease: 'easeOut' },
    });
    window.setTimeout(() => setBits([]), 640);

    // …then fade back in, equally smooth.
    await new Promise((r) => setTimeout(r, 160));
    await content.start({
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: 'easeOut' },
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
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative block"
      >
        <motion.span
          ref={boxRef}
          animate={content}
          className="flex items-center gap-2.5"
        >
          {imgOk ? (
            <Image
              src="/logo/cloudz-logo.png"
              alt={site.name}
              width={72}
              height={72}
              priority
              unoptimized
              onError={() => setImgOk(false)}
              className="h-12 w-auto shrink-0 drop-shadow-[0_0_12px_rgba(0,102,255,0.5)]"
            />
          ) : null}
          <span className="text-xl font-bold tracking-tight text-white">
            {site.name}
          </span>
        </motion.span>

        {/* Pixel bits */}
        <AnimatePresence>
          {bits.map((b) => (
            <motion.span
              key={b.id}
              initial={{ opacity: 1, x: b.x, y: b.y, scale: 1 }}
              animate={{ opacity: 0, x: b.x + b.dx, y: b.y + b.dy, scale: 0.4 }}
              transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: b.size, height: b.size }}
              className="pointer-events-none absolute left-0 top-0 bg-brand-400 shadow-[0_0_4px_rgb(var(--brand-500)/0.8)]"
            />
          ))}
        </AnimatePresence>
      </motion.span>
    </Link>
  );
}
