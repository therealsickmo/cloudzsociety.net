import type { SVGProps } from 'react';

/** Minecraft grass block — isometric 3D icon (fixed colours). */
export function MinecraftBlock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      {/* Top face — grass */}
      <polygon
        points="16,3 29,10.5 16,18 3,10.5"
        fill="#6DBE45"
        stroke="#3f7f32"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Left face — dirt */}
      <polygon
        points="3,10.5 16,18 16,29 3,21.5"
        fill="#8A5C35"
        stroke="#4a2f1c"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Right face — dirt (darker for shading) */}
      <polygon
        points="16,18 29,10.5 29,21.5 16,29"
        fill="#6E4527"
        stroke="#3a2517"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Grass overhang on the left side */}
      <polygon points="3,10.5 16,18 16,20.6 3,13.1" fill="#59A538" />
      {/* Grass overhang on the right side */}
      <polygon points="16,18 29,10.5 29,13.1 16,20.6" fill="#4C8C30" />
      {/* Subtle grass texture on top */}
      <polygon points="16,7 20,9.3 16,11.6 12,9.3" fill="#63B23D" opacity="0.7" />
    </svg>
  );
}
