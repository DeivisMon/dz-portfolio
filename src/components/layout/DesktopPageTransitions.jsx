import { motion as Motion } from "framer-motion";
import { usePageTransition } from "../../context/TransitionContext";

export default function DesktopPageTransitions({ children }) {
  const { setIsTransitioning } = usePageTransition();

  const Animate = (variants) => {
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants,
    };
  };

  const slide = {
    initial: { y: "100vh", scaleY: 1 },
    animate: { y: "-100vh", scaleY: 0.85 },
    exit: {
      y: 0,
      scaleY: 1,
      transition: { duration: 0.65, delay: 0.2, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const zoomOut = {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: {
      y: "15vh",
      scale: 1.05,
      skewZ: 100,
      transition: {
        duration: 0.5,
        delay: 0.35,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <Motion.div
        {...Animate(slide)}
        onAnimationStart={(def) => def === "exit" && setIsTransitioning(true)}
        onAnimationComplete={(def) =>
          def === "exit" && setIsTransitioning(false)
        }
        className="fixed bottom-0 left-0 bg-bckg min-w-full z-1000"
        style={{ minHeight: "calc(100dvh)" }}
      />
      <Motion.div {...Animate(zoomOut)} style={{ minHeight: "calc(100dvh)" }}>
        {children}
      </Motion.div>
    </div>
  );
}
