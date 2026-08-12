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
    initial: { y: "100vh", scaleX: 0.5 },
    animate: { y: "100vh", scaleX: 0.5 },
    exit: {
      top: "188px",
      y: 0,
      scaleX: 1,
      transition: { duration: 1, delay: 0.005, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const zoomOut = {
    initial: { y: 0 },
    animate: { y: 0 },
    exit: {
      y: "100vh",
      transition: { duration: 1, ease: [0.87, 0.25, 0.13, 1] },
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
        className="fixed bottom-0 left-0 bg-bckg min-w-full z-10"
        style={{ minHeight: "calc(100dvh)" }}
      />
      <Motion.div {...Animate(zoomOut)} style={{ minHeight: "calc(100dvh)" }}>
        {children}
      </Motion.div>
    </div>
  );
}
