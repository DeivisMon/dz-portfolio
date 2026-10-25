import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { globalCursor } from "./CustomCursor";

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function DistortionCursor({
  size = 180,
  strength = 70,
  excludeSelector = ".cursor-no-distort",
}) {
  const blobRef = useRef(null);
  const rafRef = useRef(null);
  const smoothedRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [supported, setSupported] = useState(true);
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  useEffect(() => {
    const ok =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      (CSS.supports("backdrop-filter", "url(#glass-distortion)") ||
        CSS.supports("-webkit-backdrop-filter", "url(#glass-distortion)"));
    setSupported(!!ok);
  }, []);

  useLayoutEffect(() => {
    if (!blobRef.current) return;
    const { x, y } = smoothedRef.current;
    blobRef.current.style.transform = `translate3d(${x - size / 2}px, ${
      y - size / 2
    }px, 0)`;
  }, [size]);

  useEffect(() => {
    const render = () => {
      const smoothed = smoothedRef.current;

      if (globalCursor.ready) {
        smoothed.x = lerp(smoothed.x, globalCursor.x, 0.18);
        smoothed.y = lerp(smoothed.y, globalCursor.y, 0.18);
        if (!visible) setVisible(true);
      }

      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${
          smoothed.x - size / 2
        }px, ${smoothed.y - size / 2}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafRef.current);
  }, [size, visible]);

  // Cancel/suppress the glass effect over tagged elements (menu buttons, etc.)
  useEffect(() => {
    if (!excludeSelector) return;

    const handleOver = (e) => {
      if (e.target.closest(excludeSelector)) setSuppressed(true);
    };
    const handleOut = (e) => {
      const stillInside =
        e.relatedTarget && e.relatedTarget.closest?.(excludeSelector);
      if (e.target.closest(excludeSelector) && !stillInside) {
        setSuppressed(false);
      }
    };

    // Delegated on document, so it works for elements added/removed later too
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [excludeSelector]);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="glass-distortion"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale={strength}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={blobRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full transition-opacity duration-200 ease-out"
        style={{
          width: size,
          height: size,
          zIndex: 9997,
          willChange: "transform",
          opacity: visible && !suppressed ? 1 : 0,
          backdropFilter: supported
            ? "url(#glass-distortion) blur(0.5px) saturate(1.15)"
            : "blur(6px) saturate(1.15)",
          WebkitBackdropFilter: supported
            ? "url(#glass-distortion) blur(0.5px) saturate(1.15)"
            : "blur(6px) saturate(1.15)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow:
            "inset 0 0 20px rgba(255,255,255,0.15), 0 4px 24px rgba(0,0,0,0.15)",
        }}
      />
    </>
  );
}
