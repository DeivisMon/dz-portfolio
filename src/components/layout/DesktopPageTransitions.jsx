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
    initial: { y: "100vh" },
    animate: { y: "100vh" },
    exit: {
      y: 0,
      transition: { duration: 1, delay: 0.125, ease: [0.87, 0, 0.13, 1] },
    },
  };

  const zoomOut = {
    initial: { y: 0, opacity: 1 },
    animate: { y: 0, opacity: 1 },
    exit: {
      y: "100vh",
      opacity: 0,
      transition: { duration: 1, ease: [0.53, 0.2, 0.17, 1] },
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
