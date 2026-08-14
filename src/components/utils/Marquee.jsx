import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "Fotosesijos",
  "Renginiai",
  "Sporto varžybos",
  "Komercinė fotografija",
  "Kraštovaizdžiai",
  "Portretai",
  "Vestuvės",
  "Architektūra",
  "Gamta",
  "Fotosesijos",
  "Renginiai",
  "Sporto varžybos",
  "Komercinė fotografija",
  "Kraštovaizdžiai",
  "Portretai",
  "Vestuvės",
  "Architektūra",
  "Gamta",
];

export default function Marquee({
  textColor = "text-header",
  speed = 50,
  textSize = "text-xs xl:text-xl",
  className = "",
}) {
  const firstGroupRef = useRef(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const items = MARQUEE_ITEMS;

  useEffect(() => {
    const measure = () => {
      if (firstGroupRef.current) {
        setGroupWidth(firstGroupRef.current.offsetWidth);
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);

    if (firstGroupRef.current) {
      resizeObserver.observe(firstGroupRef.current);
    }

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items]);

  const renderItems = (groupRef = null) => (
    <div
      ref={groupRef}
      className="flex shrink-0 items-center bg-surface whitespace-nowrap"
      aria-hidden={groupRef ? undefined : true}
    >
      {items.map((item, i) => (
        <span
          key={`${item}-${i}`}
          className={`
            inline-flex
            shrink-0
            items-center
            ${textColor}
            ${textSize}
            uppercase
            tracking-widest
            opacity-70
          `}
        >
          {item}

          <span className="mx-4 xl:mx-8 opacity-85">•</span>
        </span>
      ))}
    </div>
  );

  return (
    <Motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        relative
        w-full
        overflow-hidden
        select-none
        pointer-events-none
        ${className}
      `}
      style={{
        isolation: "isolate",
      }}
    >
      <div
        className="flex"
        style={{
          transform: `translate3d(
            ${groupWidth ? 0 : 0}px,
            0,
            0
          )`,
          animation:
            groupWidth > 0
              ? `marquee-scroll ${groupWidth / speed}s linear infinite`
              : "none",
          willChange: "transform",
        }}
      >
        {renderItems(firstGroupRef)}
        {renderItems()}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-${groupWidth}px, 0, 0);
          }
        }
      `}</style>
    </Motion.div>
  );
}
