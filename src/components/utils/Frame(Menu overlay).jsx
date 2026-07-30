import { useResponsive } from "../../hooks/useResponsive";
import { motion as Motion } from "framer-motion";

export default function Frame() {
  const responsive = useResponsive();
  const now = new Date();
  const month = now.toLocaleDateString("lt-LT", { month: "long" });
  const year = now.getFullYear().toString().slice(-2);

  const Animate = (variants) => {
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants,
    };
  };

  const frame = {
    initial: { scale: 0.5, opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.75, delay: 1.75, ease: [0.11, 0, 0.5, 0] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, delay: 0.25, ease: [-0.53, -0.4, 0.53, 1] },
    },
  };

  return (
    <Motion.div
      // {...Animate(frame)}
      className={`film-frame h-[calc(100dvh)]`}
    >
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 100,
          width: "2rem",
          height: "1px",
          background: "#c9a84c",
          opacity: 0.6,
          mixBlendMode: "difference",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 100,
          width: "2rem",
          height: "1px",
          background: "#c9a84c",
          opacity: 0.6,
          mixBlendMode: "difference",
        }}
      />
      <div className="absolute left-3 top-3 z-[100] flex flex-col items-center mix-blend-difference">
        {Array.from({
          length: responsive.isMobile || responsive.isTablet ? 6 : 12,
        }).map((_, i) => (
          <div
            key={i}
            className={`filmstrip-dot ${[2, 5, 9, 13, 16].includes(i) ? "lit" : ""}`}
          />
        ))}
      </div>
      <div className="absolute right-3 bottom-3 z-[100] flex flex-col items-center mix-blend-difference">
        {Array.from({
          length: responsive.isMobile || responsive.isTablet ? 6 : 12,
        }).map((_, i) => (
          <div
            key={i}
            className={`filmstrip-dot ${[2, 5, 9, 13, 16].includes(i) ? "lit" : ""}`}
          />
        ))}
      </div>
    </Motion.div>
  );
}
