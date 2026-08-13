import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

const MenuBtn = ({ isMenuOpen, toggleMenu, springX, springY }) => {
  const responsive = useResponsive();
  const isCompact = responsive.isMobile || responsive.isTablet;

  const barOffset = isCompact ? 1.5 : 3;
  const barHalfWidth = isCompact ? 5 : 7.5;

  return (
    <Motion.div
      className={`cursor-trigger 
        group fixed top-2 right-4 md:top-12 md:right-8 z-[2]
        w-[90px] h-11 md:w-40 md:h-20
        ${isMenuOpen ? "w-10 md:w-[60px]" : "w-[90px] md:w-40"}
        rounded-[8em] origin-center cursor-pointer
        bg-bckg/65 backdrop-blur-[200px] 
        transition-[width] duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
        will-change-transform
      `}
      onClick={toggleMenu}
      style={isCompact ? undefined : { x: springX, y: springY }}
    >
      {/* shadow layer */}
      <div
        className={`
          absolute inset-0 rounded-[8em] shadow-xs shadow-accent/55
          transition-opacity duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* menu-p */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 right-11 md:right-[90px]
          text-white z-[1]
          transition-[right] duration-[750ms] ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100 group-hover:right-10 md:group-hover:right-20"}
        `}
      >
        <p className="font-bold text-[clamp(10px,0.8vw,14px)] uppercase">
          Meniu
        </p>
      </div>

      {/* menu-toggle */}
      <div
        className={`
          absolute right-0 w-11 h-11 md:w-20 md:h-20 rounded-full overflow-hidden z-10 
          transition-all duration-[350ms] ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${
            isMenuOpen
              ? "[clip-path:circle(50%_at_50%_50%)] scale-[1.125] bg-transparent border border-muted/85"
              : "[clip-path:circle(10%_at_50%_50%)] group-hover:[clip-path:circle(35%_at_50%_50%)] bg-muted/85"
          }
        `}
      >
        {/* hamburger */}
        <div
          className={`
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-4 h-4 md:w-[30px] md:h-[30px]
            transition-opacity duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
            ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          {/* top bar */}
          <Motion.div
            className={`absolute top-1/2 left-1/2 w-2.5 md:w-[15px] h-px bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
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
            className={`absolute top-1/2 left-1/2 w-2.5 md:w-[15px] h-px bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
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
