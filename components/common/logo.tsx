'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSettings } from '@/components/providers/settings-provider';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/** Path to the real brand logo. Drop a (transparent) PNG here to use it. */
const LOGO_SRC = '/logo/cloudz-logo.png';

/**
 * CLOUDZ™ brand mark.
 *
 * Renders the real logo from `public/logo/cloudz-logo.png` if present and
 * gracefully falls back to a self-contained inline SVG "C" mark if the
 * image is missing — so the header never shows a broken image.
 */
export function Logo({ className, showText = true }: LogoProps) {
  const [imageOk, setImageOk] = useState(true);
  const { site } = useSettings();

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center">
        <span className="absolute inset-0 rounded-xl bg-brand/25 blur-md" />
        {imageOk ? (
          <Image
            src={LOGO_SRC}
            alt="CLOUDZ Logo"
            width={40}
            height={40}
            priority
            unoptimized
            onError={() => setImageOk(false)}
            className="relative size-9 object-contain drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]"
          />
        ) : (
          <svg
            viewBox="0 0 52 48"
            fill="none"
            className="relative h-9 w-[2.6rem] drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="cz-blue" x1="0" y1="0" x2="0" y2="48">
                <stop offset="0" stopColor="#4C93FF" />
                <stop offset="0.5" stopColor="#0066FF" />
                <stop offset="1" stopColor="#0036A6" />
              </linearGradient>
              <linearGradient id="cz-silver" x1="0" y1="0" x2="0" y2="48">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="0.55" stopColor="#D3DBE6" />
                <stop offset="1" stopColor="#9AA6B8" />
              </linearGradient>
            </defs>
            <g
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="900"
              fontSize="46"
              paintOrder="stroke"
            >
              <text
                x="-3"
                y="39"
                fill="url(#cz-blue)"
                stroke="#EAF2FF"
                strokeWidth="1.5"
              >
                C
              </text>
              <text
                x="22"
                y="41"
                fill="url(#cz-silver)"
                stroke="#0D1117"
                strokeWidth="1.2"
              >
                S
              </text>
            </g>
          </svg>
        )}
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-white">
          {site.name}
        </span>
      )}
    </span>
  );
}
