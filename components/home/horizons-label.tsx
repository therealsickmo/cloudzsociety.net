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
          width={48}
          height={48}
          unoptimized
          onError={() => setBlockOk(false)}
          className="size-8 shrink-0 object-contain"
        />
      ) : (
        <MinecraftBlock className="size-8 shrink-0" />
      )}

      <span className="flex flex-col items-center justify-center leading-none">
        {logoOk ? (
          <Image
            src="/icons/minecraft-logo.png"
            alt="Minecraft"
            width={160}
            height={90}
            unoptimized
            onError={() => setLogoOk(false)}
            className="h-5 w-auto max-w-[130px] object-contain"
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
