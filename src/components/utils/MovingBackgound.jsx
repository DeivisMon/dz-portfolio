import { useMemo } from "react";

// One shape's parameters + animation
function makeShape(seed) {
  // Simple deterministic pseudo-random based on seed so shapes
  // stay stable across re-renders but still look varied.
  const rand = (n) => {
    const x = Math.sin(seed * 999 + n * 137.5) * 10000;
    return x - Math.floor(x);
  };

  const cx = rand(1) * 100; // center x %
  const cy = rand(2) * 100; // center y %
  const width = 14 + rand(3) * 20; // rect width, in vw-ish units
  const height = 24 + rand(3.5) * 30; // rect height, in vw-ish units
  const rotation = rand(4) * 360;
  const opacity = 0.03 + rand(5) * 0.09;
  const duration = 22 + rand(6) * 26; // seconds, slow drift
  const delay = -rand(7) * duration; // negative delay to desync start
  const driftX = (rand(8) - 0.5) * 14; // % drift range
  const driftY = (rand(9) - 0.5) * 14;
  const shade = 200 + Math.floor(rand(10) * 55); // grayscale value 200-255

  return {
    cx,
    cy,
    width,
    height,
    rotation,
    opacity,
    duration,
    delay,
    driftX,
    driftY,
    shade,
  };
}

const SHAPE_COUNT = 22;
const SKEW = 0.15; // 15% skew

// A rectangle skewed 15% along the top/bottom edges, like a slanted
// parallelogram: /____/
//               /   /
//              /  /
//              ----
function skewedRectPoints(skew = SKEW) {
  const offset = skew * 100; // skew as % of the 100x100 viewBox
  return `${offset},0 100,0 ${100 - offset},100 0,100`;
}

export default function MovingBackground({
  className = "",
  shapeCount = SHAPE_COUNT,
}) {
  const shapes = useMemo(
    () => Array.from({ length: shapeCount }, (_, i) => makeShape(i + 1)),
    [],
  );

  const points = useMemo(() => skewedRectPoints(), []);

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-b from-neutral-800 via-neutral-900 to-black ${className}`}
      aria-hidden="true"
    >
      {/* subtle static gradient overlay for depth */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="bgFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgFade)" />
      </svg>

      {/* floating skewed rectangles */}
      {shapes.map((s, i) => (
        <div
          key={i}
          className="absolute will-change-transform"
          style={{
            left: `${s.cx}%`,
            top: `${s.cy}%`,
            animation: `drift-${i} ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <svg
            width={s.width * 8}
            height={s.height * 8}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
              opacity: s.opacity,
            }}
          >
            <polygon
              points={points}
              fill={`rgb(${s.shade}, ${s.shade}, ${s.shade})`}
            />
          </svg>

          <style>{`
            @keyframes drift-${i} {
              0%   { transform: translate(0, 0) rotate(0deg); }
              50%  { transform: translate(${s.driftX}vw, ${s.driftY}vh) rotate(${
                (i % 2 === 0 ? 1 : -1) * 6
              }deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
