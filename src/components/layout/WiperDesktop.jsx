import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "../../context/TransitionContext";
import { customEases } from "../helpers/CustomEasingFn";

const getViewportHeight = () => {
  if (typeof window === "undefined") return 0; // SSR guard
  return window.visualViewport?.height || window.innerHeight;
};

export default function WiperDesktop() {
  const wipeRef = useRef(null);
  const { setIsTransitioning } = usePageTransition();
  const [height] = useState(() => getViewportHeight());

  useEffect(() => {
    setIsTransitioning(true);
  }, [setIsTransitioning]);

  return (
    <motion.div
      ref={wipeRef}
      className="bg-bckg"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: `${height}px`,
        zIndex: 1000,
        pointerEvents: "none",
        willChange: "transform",
        transformOrigin: "bottom",
      }}
      initial={{ scaleY: 1, opacity: 1 }}
      animate={{ scaleY: 0, opacity: 1 }}
      transition={{
        delay: 0.75,
        duration: 1,
        ease: customEases.pageTransition,
      }}
      onAnimationComplete={() => setIsTransitioning(false)}
    />
  );
}
