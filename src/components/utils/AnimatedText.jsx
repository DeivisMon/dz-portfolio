import { easeInOut, motion as Motion } from "framer-motion";

const getContainer = (delay, delayChildren, staggerChildren) => ({
  hidden: {
    y: -100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      delay,
      delayChildren,
      staggerChildren,
    },
  },
  exit: {
    opacity: 0,
    scaleX: 1.5,
    transition: {
      duration: 0.25,
      delay,
    },
  },
});

const getLetter = (duration) => ({
  hidden: {
    x: "-100%",
    skewX: 45,
    opacity: 0,
  },
  show: {
    x: "0%",
    skewX: 0,
    opacity: 1,
    transition: {
      duration,
      ease: easeInOut,
    },
  },
});

const AnimatedText = ({
  text,
  textColor = "text-current",
  duration = 0.35,
  delay = "",
  delayChildren = 1.8,
  staggerChildren = 0.025,
  hoverStagger = 0.025,
  className = "",
  enableHover = true,
  letterSpacing = "",
  scaleX = "",
  textShadow = "",
  pyPadding = "",
  firstLetterUpsideDown = false,
  firstLetterOffsetY = "-0.18em",
}) => {
  const container = getContainer(delay, delayChildren, staggerChildren);
  const letter = getLetter(duration);

  const flippedStyle = (i) =>
    firstLetterUpsideDown && i === 0
      ? { rotate: 180, y: firstLetterOffsetY }
      : {};

  return (
    <div className={`inline-block ${className}`}>
      <Motion.span
        className="inline-flex overflow-hidden relative"
        variants={container}
        initial="hidden"
        animate="show"
        // exit="exit"
        whileHover={enableHover ? "hover" : undefined}
      >
        {/* Main text with entry animation */}
        <span className="flex items-baseline">
          {text.split("").map((char, i) => (
            <Motion.span
              key={`main-${char}-${i}`}
              className={`overflow-hidden relative ${scaleX} ${textShadow} p-0`}
              style={{
                display: "inline-block",
                ...flippedStyle(i),
              }}
            >
              <Motion.span
                variants={{
                  ...letter,
                  hover: enableHover ? { y: "-100%" } : {},
                }}
                className={`inline-block ${textColor} flex justify-center ${letterSpacing} ${pyPadding}`}
                transition={{
                  ...letter.show.transition,
                  ...(enableHover && {
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: hoverStagger * i,
                  }),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </Motion.span>
            </Motion.span>
          ))}
        </span>

        {/* Hover duplicate text */}
        {enableHover && (
          <span className="absolute inset-0 flex items-baseline ">
            {text.split("").map((char, i) => (
              <Motion.span
                key={`hover-${char}-${i}`}
                className={`overflow-hidden ${scaleX} ${textShadow}`}
                style={{
                  display: "inline-block",
                  ...flippedStyle(i),
                }}
              >
                <Motion.span
                  variants={{
                    hidden: { y: "100%" },
                    show: { y: "100%" },
                    hover: { y: 0 },
                  }}
                  className={`inline-block ${textColor} flex justify-center ${letterSpacing} ${pyPadding} p-0`}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: hoverStagger * i,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </Motion.span>
              </Motion.span>
            ))}
          </span>
        )}
      </Motion.span>
    </div>
  );
};

export default AnimatedText;
