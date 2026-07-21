import type { SVGProps } from 'react';

// Pixel map of a Minecraft dirt block (16×16), 4 brown shades.
const PIXELS = [
  '1021012310210120',
  '0113101101131011',
  '2101210102012101',
  '1310112013101120',
  '0213001102130011',
  '1011021310110213',
  '3102110131021101',
  '0110131001101310',
  '1021012010210120',
  '0101131101011311',
  '2110021321100213',
  '1013100210131002',
  '0231001102310011',
  '1100210311002103',
  '3102110131021101',
  '0110131001101310',
];

const COLORS = ['#8A5C35', '#75492A', '#9C6D41', '#5C3B22'];

/** Minecraft dirt block — pixel texture (fixed colours). */
export function MinecraftBlock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden
      {...props}
    >
      {PIXELS.map((row, y) =>
        row
          .split('')
          .map((c, x) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="1"
              height="1"
              fill={COLORS[Number(c)]}
            />
          )),
      )}
    </svg>
  );
}
