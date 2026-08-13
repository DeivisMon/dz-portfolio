import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

const MenuBtn = ({ isMenuOpen, toggleMenu, springX, springY, isLocked }) => {
  const responsive = useResponsive();
  const isCompact = responsive.isMobile || responsive.isTablet;

  const barOffset = isCompact ? 1.5 : 3;
  const barHalfWidth = isCompact ? 5 : 7.5;

  return (
    <Motion.div
      className={`
        group fixed top-2 right-4 xl:top-8 xl:right-8 z-[2]
        w-[90px] h-11 xl:w-40 xl:h-20
        ${isMenuOpen ? "w-10 xl:w-[60px]" : "w-[90px] xl:w-40"}
        rounded-[8em] origin-center cursor-pointer
        bg-transparent
        transition-[width] duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
        will-change-transform
      `}
      onClick={isLocked ? undefined : toggleMenu}
      style={isCompact ? undefined : { x: springX, y: springY }}
    >
      {/* shadow layer */}
      <div
        className={`
          absolute inset-0 rounded-[8em] shadow-xs shadow-accent/35
          transition-opacity duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* menu-p */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 right-11 xl:right-[90px]
          text-white z-[1]
          transition-[right] duration-[750ms] ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100 group-hover:right-10 xl:group-hover:right-20"}
        `}
      >
        <p className="font-bold text-[10px] xl:text-sm uppercase">Meniu</p>
      </div>

      {/* menu-toggle */}
      <div
        className={`
          absolute right-0 w-11 h-11 xl:w-20 xl:h-20 rounded-full overflow-hidden z-10 
          transition-all duration-[850ms] ease-[cubic-bezier(0.075,0.82,0.165,1)]
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
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-4 h-4 xl:w-[30px] xl:h-[30px]
            transition-opacity duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
            ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          {/* top bar */}
          <Motion.div
            className={`absolute top-1/2 left-1/2 w-2.5 xl:w-[15px] h-px bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
            style={{ marginLeft: -barHalfWidth, marginTop: -0.5 }}
            animate={
              isMenuOpen
                ? { y: 0, rotate: 240, scaleX: 1.5 }
                : { y: -barOffset, rotate: 0, scaleX: 1 }
            }
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
          {/* bottom bar */}
          <Motion.div
            className={`absolute top-1/2 left-1/2 w-2.5 xl:w-[15px] h-px bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
            style={{ marginLeft: -barHalfWidth, marginTop: -0.5 }}
            animate={
              isMenuOpen
                ? { y: 0, rotate: 300, scaleX: 1.5 }
                : { y: barOffset, rotate: 0, scaleX: 1 }
            }
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
    </Motion.div>
  );
};

export default MenuBtn;
