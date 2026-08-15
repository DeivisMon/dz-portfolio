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
    initial: { y: "100vh", scaleX: 0.85 },
    animate: { y: "100vh", scaleX: 0.85 },
    exit: {
      y: 0,
      scaleX: 1,
      transition: { duration: 1, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const zoomOut = {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: {
      scaleX: 0.95,
      transition: {
        duration: 0.75,
        delay: 0.25,
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
