'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MinecraftBlock } from '@/components/icons/minecraft-block';

/**
 * Button label for "Minecraft Horizons".
 * Uses the real grass-block image (public/icons/grass-block.png) if present,
 * with a fallback SVG. Text is in the normal button font (same as the other
 * buttons) — no image logo, no pixel font.
 */
export function HorizonsLabel() {
  const [blockOk, setBlockOk] = useState(true);

  return (
    <span className="flex items-center justify-center gap-2.5">
      {blockOk ? (
        <Image
          src="/icons/grass-block.png"
          alt=""
          width={48}
          height={48}
          unoptimized
          onError={() => setBlockOk(false)}
          className="size-8 shrink-0 object-contain"
        />
      ) : (
        <MinecraftBlock className="size-8 shrink-0" />
      )}

      <span className="flex flex-col items-center justify-center text-center leading-none">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
          Minecraft
        </span>
        <span className="mt-0.5 text-base font-bold uppercase tracking-wide text-white">
          Horizons
        </span>
      </span>
    </span>
  );
}
