import type { SVGProps } from 'react';

/** Minecraft grass block — chunky isometric 3D cube (fixed colours). */
export function MinecraftBlock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      {/* Top face — grass */}
      <polygon
        points="16,3 28,9.5 16,16 4,9.5"
        fill="#6DBE45"
        stroke="#3f7f32"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Left face — dirt (taller for a cube look) */}
      <polygon
        points="4,9.5 16,16 16,29.5 4,23"
        fill="#8A5C35"
        stroke="#4a2f1c"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Right face — dirt (darker for shading) */}
      <polygon
        points="16,16 28,9.5 28,23 16,29.5"
        fill="#6E4527"
        stroke="#3a2517"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      {/* Grass overhang — left */}
      <polygon points="4,9.5 16,16 16,19 4,12.5" fill="#59A538" />
      {/* Grass overhang — right */}
      <polygon points="16,16 28,9.5 28,12.5 16,19" fill="#4C8C30" />
      {/* Subtle top texture */}
      <polygon points="16,6.5 21,9.2 16,11.9 11,9.2" fill="#63B23D" opacity="0.6" />
      {/* Dirt speckles */}
      <rect x="7" y="16" width="2" height="2" fill="#6E4527" opacity="0.6" />
      <rect x="11.5" y="21" width="2" height="2" fill="#734a29" opacity="0.6" />
      <rect x="21" y="17" width="2" height="2" fill="#5c3a20" opacity="0.6" />
    </svg>
  );
}
