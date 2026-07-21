import type { SVGProps } from 'react';
import { useId } from 'react';

/** Simple Minecraft-style grass block icon (fixed colours). */
export function MinecraftBlock(props: SVGProps<SVGSVGElement>) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <defs>
        <clipPath id={`mcb-${id}`}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#mcb-${id})`}>
        <rect x="3" y="3" width="18" height="18" fill="#7B5230" />
        <rect x="3" y="3" width="18" height="8" fill="#5FB84C" />
        <rect x="3" y="9" width="18" height="2" fill="#3F7F32" />
        <rect x="6.5" y="13" width="2.6" height="2.6" fill="#63421F" />
        <rect x="13" y="16" width="2.6" height="2.6" fill="#63421F" />
        <rect x="15.4" y="12.4" width="2.6" height="2.6" fill="#63421F" />
        <rect x="9.5" y="17" width="2.2" height="2.2" fill="#63421F" />
      </g>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
      />
    </svg>
  );
}
