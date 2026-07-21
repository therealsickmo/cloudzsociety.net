import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

/**
 * CLOUDZ™ brand mark — a stylised "C" built from an inline SVG in the
 * corporate blue with a soft glow, plus the wordmark. Self-contained,
 * so it renders without any external asset.
 */
export function Logo({ className, showText = true }: LogoProps) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center">
        <span className="absolute inset-0 rounded-xl bg-brand/25 blur-md" />
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="relative size-9 drop-shadow-[0_0_8px_rgba(0,102,255,0.6)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="cloudz-c" x1="6" y1="6" x2="42" y2="42">
              <stop offset="0" stopColor="#3385FF" />
              <stop offset="0.5" stopColor="#0066FF" />
              <stop offset="1" stopColor="#003D99" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="12"
            fill="url(#cloudz-c)"
          />
          <path
            d="M33 17.5a11 11 0 1 0 0 13"
            stroke="#EAF2FF"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-white">
          {SITE.name}
        </span>
      )}
    </span>
  );
}
