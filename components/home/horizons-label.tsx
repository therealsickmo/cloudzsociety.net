'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MinecraftBlock } from '@/components/icons/minecraft-block';

/**
 * Button label for "Minecraft Horizons".
 * Uses the real grass-block image (public/icons/grass-block.png) and the
 * official Minecraft wordmark (public/icons/minecraft-logo.png) if present,
 * with graceful fallbacks (SVG block + pixel text) so nothing breaks.
 */
export function HorizonsLabel() {
  const [blockOk, setBlockOk] = useState(true);
  const [logoOk, setLogoOk] = useState(true);

  return (
    <span className="flex items-center gap-2">
      {blockOk ? (
        <Image
          src="/icons/grass-block.png"
          alt=""
          width={40}
          height={40}
          unoptimized
          onError={() => setBlockOk(false)}
          className="size-7 shrink-0 [image-rendering:pixelated]"
        />
      ) : (
        <MinecraftBlock className="size-7 shrink-0" />
      )}

      <span className="flex flex-col items-center justify-center leading-none">
        {logoOk ? (
          <Image
            src="/icons/minecraft-logo.png"
            alt="Minecraft"
            width={140}
            height={28}
            unoptimized
            onError={() => setLogoOk(false)}
            className="h-3.5 w-auto"
          />
        ) : (
          <span className="font-pixel text-sm font-bold uppercase tracking-wide text-white">
            Minecraft
          </span>
        )}
        <span className="text-gradient-brand font-pixel text-sm font-bold leading-tight">
          Horizons
        </span>
      </span>
    </span>
  );
}
