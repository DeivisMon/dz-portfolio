import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

const MenuBtn = ({ isMenuOpen, toggleMenu, springX, springY, isLocked }) => {
  const responsive = useResponsive();
  const isCompact = responsive.isMobile || responsive.isTablet;

  const barOffset = isCompact ? 1.5 : 3;
  const barHalfWidth = isCompact ? 5 : 7.5;

  const buttonWidth = isMenuOpen
    ? isCompact
      ? "w-10"
      : "w-[60px]"
    : isCompact
      ? "w-[90px]"
      : "w-40";

  const buttonPosition = isCompact
    ? "top-2 right-4 h-11"
    : "top-12 right-8 h-20";

  const menuTextPosition = isCompact ? "right-11" : "right-[90px]";
  const menuTextHoverPosition = isCompact
    ? "group-hover:right-10"
    : "group-hover:right-20";

  const toggleSize = isCompact ? "w-11 h-11" : "w-20 h-20";
  const hamburgerSize = isCompact ? "w-4 h-4" : "w-[30px] h-[30px]";
  const barWidth = isCompact ? "w-2.5" : "w-[15px]";

  return (
    <Motion.div
      className={`
        group fixed
        ${buttonPosition}
        ${buttonWidth}
        rounded-[8em] origin-center cursor-pointer
        bg-transparent
        transition-[width] duration-500
        ease-[cubic-bezier(0.075,0.82,0.165,1)]
        will-change-transform
      `}
      onClick={isLocked ? undefined : toggleMenu}
      style={isCompact ? undefined : { x: springX, y: springY }}
    >
      {/* shadow layer */}
      <div
        className={`
          absolute inset-0 rounded-[8em]
          shadow-xs shadow-accent/35
          transition-opacity duration-500
          ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* menu text */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2
          ${menuTextPosition}
          text-white z-[1]
          transition-[right] duration-[750ms]
          ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : `opacity-100 ${menuTextHoverPosition}`}
        `}
      >
        <p
          className={`
            font-bold uppercase
            ${isCompact ? "text-[10px]" : "text-sm"}
          `}
        >
          Meniu
        </p>
      </div>

      {/* menu toggle */}
      <div
        className={`
          absolute right-0
          ${toggleSize}
          rounded-full overflow-hidden z-10
          transition-all duration-[850ms]
          ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${
            isMenuOpen
              ? "[clip-path:circle(50%_at_50%_50%)] scale-[1.125] bg-transparent border border-accent"
              : "[clip-path:circle(10%_at_50%_50%)] group-hover:[clip-path:circle(35%_at_50%_50%)] bg-accent/70"
          }
        `}
      >
        {/* hamburger */}
        <div
          className={`
            absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            ${hamburgerSize}
            transition-opacity duration-500
            ease-[cubic-bezier(0.075,0.82,0.165,1)]
            ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          {/* top bar */}
          <Motion.div
            className={`
              absolute top-1/2 left-1/2
              ${barWidth}
              h-px
              ${isMenuOpen ? "bg-accent" : "bg-bckg"}
            `}
            style={{
              marginLeft: -barHalfWidth,
              marginTop: -0.5,
            }}
            animate={
              isMenuOpen
                ? {
                    y: 0,
                    rotate: 240,
                    scaleX: 1.5,
                  }
                : {
                    y: -barOffset,
                    rotate: 0,
                    scaleX: 1,
                  }
            }
            transition={{
              duration: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
          />

          {/* bottom bar */}
          <Motion.div
            className={`
              absolute top-1/2 left-1/2
              ${barWidth}
              h-px
              ${isMenuOpen ? "bg-accent" : "bg-bckg"}
            `}
            style={{
              marginLeft: -barHalfWidth,
              marginTop: -0.5,
            }}
            animate={
              isMenuOpen
                ? {
                    y: 0,
                    rotate: 300,
                    scaleX: 1.5,
                  }
                : {
                    y: barOffset,
                    rotate: 0,
                    scaleX: 1,
                  }
            }
            transition={{
              duration: 0.45,
              ease: [0.65, 0, 0.35, 1],
            }}
          />
        </div>
      </div>
    </Motion.div>
  );
};

export default MenuBtn;
