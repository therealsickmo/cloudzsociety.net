'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Minecraft skin render — fills its (positioned) parent, anchored to the
 * bottom, gently bobbing. The parent controls position/size/overflow.
 *
 * The source image is auto-trimmed of its transparent border in the browser
 * (via canvas) before being shown, so every skin fills its frame edge-to-edge
 * and all skins render at the same height regardless of how much empty padding
 * their PNG/WebP had. Renders nothing if the image is missing or fails to load.
 */
export function CardSkin({ src }: { src: string }) {
  const [display, setDisplay] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    setFailed(false);
    setDisplay(null);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('no ctx');
        ctx.drawImage(img, 0, 0);

        const { data } = ctx.getImageData(0, 0, w, h);
        const threshold = 12;
        let top = h,
          left = w,
          right = 0,
          bottom = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] > threshold) {
              if (x < left) left = x;
              if (x > right) right = x;
              if (y < top) top = y;
              if (y > bottom) bottom = y;
            }
          }
        }

        // Fully transparent or nothing to trim → use original.
        if (right < left || bottom < top || (right - left + 1 === w && bottom - top + 1 === h)) {
          if (!cancelled) setDisplay(src);
          return;
        }

        const cw = right - left + 1;
        const ch = bottom - top + 1;
        const out = document.createElement('canvas');
        out.width = cw;
        out.height = ch;
        out.getContext('2d')?.drawImage(canvas, left, top, cw, ch, 0, 0, cw, ch);
        if (!cancelled) setDisplay(out.toDataURL('image/png'));
      } catch {
        if (!cancelled) setDisplay(src); // canvas blocked → show original
      }
    };
    img.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (failed || !src || !display) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-full items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={display}
          alt="Minecraft Skin"
          className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </div>
  );
}
