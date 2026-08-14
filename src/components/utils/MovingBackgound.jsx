import { useMemo } from "react";

// One triangle's shape + animation parameters
function makeTriangle(seed) {
  // Simple deterministic pseudo-random based on seed so triangles
  // stay stable across re-renders but still look varied.
  const rand = (n) => {
    const x = Math.sin(seed * 999 + n * 137.5) * 10000;
    return x - Math.floor(x);
  };

  const cx = rand(1) * 100; // center x %
  const cy = rand(2) * 100; // center y %
  const size = 18 + rand(3) * 34; // triangle "radius" in vw-ish units
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
    size,
    rotation,
    opacity,
    duration,
    delay,
    driftX,
    driftY,
    shade,
  };
}

const TRIANGLE_COUNT = 22;

export default function MovingBackground({
  className = "",
  triangleCount = TRIANGLE_COUNT,
}) {
  const triangles = useMemo(
    () => Array.from({ length: triangleCount }, (_, i) => makeTriangle(i + 1)),
    [],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-b from-neutral-800 via-neutral-900 to-black ${className}`}
      aria-hidden="true"
    >
      {/* subtle static overlay triangles for depth (non-animated large shapes) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40 border-t-16 border-black"
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

      {/* floating low-poly triangles */}
      {triangles.map((t, i) => (
        <div
          key={i}
          className="absolute will-change-transform"
          style={{
            left: `${t.cx}%`,
            top: `${t.cy}%`,
            animation: `drift-${i} ${t.duration}s ease-in-out ${t.delay}s infinite`,
          }}
        >
          <svg
            width={t.size * 8}
            height={t.size * 8}
            viewBox="0 0 100 100"
            style={{
              transform: `translate(-50%, -50%) rotate(${t.rotation}deg)`,
              opacity: t.opacity,
            }}
          >
            <polygon
              points="50,3 97,97 3,97"
              fill={`rgb(${t.shade}, ${t.shade}, ${t.shade})`}
            />
          </svg>

          <style>{`
            @keyframes drift-${i} {
              0%   { transform: translate(0, 0) rotate(0deg); }
              50%  { transform: translate(${t.driftX}vw, ${t.driftY}vh) rotate(${
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
