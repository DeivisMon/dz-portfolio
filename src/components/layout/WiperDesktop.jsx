import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { usePageTransition } from "../../context/TransitionContext";

export default function WiperDesktop() {
  const wipeRef = useRef(null);
  const { setIsTransitioning } = usePageTransition();

  const getViewportHeight = () => {
    const vv = window.visualViewport;
    return vv?.height || window.innerHeight;
  };

  useLayoutEffect(() => {
    const height = getViewportHeight();

    Object.assign(wipeRef.current.style, {
      position: "fixed",
      left: "0",
      top: "188px",
      width: "100vw",
      height: `${height}px`,
      zIndex: "1000",
      transformOrigin: "top",
      pointerEvents: "none",
      willChange: "transform",
      opacity: "1",
    });
  }, []);

  useEffect(() => {
    setIsTransitioning(true);

    gsap.set(wipeRef.current, { scaleY: 1, opacity: 1 });

    gsap.to(wipeRef.current, {
      scaleY: 0,
      delay: 0.675,
      transformOrigin: "bottom",
      opacity: 1,
      duration: 1,
      ease: "expo.in",
      onComplete: () => setIsTransitioning(false),
    });
  }, [setIsTransitioning]);

  return <div ref={wipeRef} className="bg-bckg" />;
}
