import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";

export default function WiperMobile() {
  const wipeRef = useRef(null);

  // Measure viewport BEFORE paint → prevents flash
  const getViewportHeight = () => {
    const vv = window.visualViewport;
    return vv?.height || window.innerHeight;
  };

  // Set size BEFORE the first frame renders
  useLayoutEffect(() => {
    const height = getViewportHeight();

    Object.assign(wipeRef.current.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "100vw",
      height: `${height}px`,
      zIndex: "999",
      transformOrigin: "bottom",
      pointerEvents: "none",
      willChange: "transform",
      opacity: "1",
    });
  }, []);

  useEffect(() => {
    gsap.set(wipeRef.current, { scaleY: 1, opacity: 1 });

    gsap.to(wipeRef.current, {
      scaleY: 0,
      delay: 1.5,
      transformOrigin: "top",
      opacity: 1,
      duration: 0.5,
      ease: "expo.out",
    });
  }, []);

  return (
    <>
      <div ref={wipeRef} className="bg-bckg" />
    </>
  );
}
