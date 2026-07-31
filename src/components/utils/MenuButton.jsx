import { motion as Motion } from "framer-motion";

const MenuBtn = ({ isMenuOpen, toggleMenu, springX, springY }) => {
  return (
    <Motion.div
      className={`
        group fixed top-8 right-8 z-[2] w-40 h-20
        ${isMenuOpen ? "w-[60px]" : "w-40"}
        rounded-[8em] origin-center cursor-pointer
        bg-transparent shadow-xs shadow-accent/35
        transition-[width] duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
        will-change-transform
      `}
      onClick={toggleMenu}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {/* menu-copy */}
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 right-[90px]
          text-white z-[1]
          transition-[right] duration-[750ms] ease-[cubic-bezier(0.075,0.82,0.165,1)]
          ${isMenuOpen ? "opacity-0" : "opacity-100 group-hover:right-20"}
        `}
      >
        <p className="font-bold text-sm uppercase">Meniu</p>
      </div>

      {/* menu-toggle-icon */}
      <div
        className={`
          absolute right-0 w-20 h-20 rounded-full overflow-hidden z-10 
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
            w-[30px] h-[30px]
            transition-opacity duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)]
            ${isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        >
          {/* top bar */}
          <Motion.div
            className={`absolute top-1/2 left-1/2 -ml-[7.5px] -mt-[0.75px] w-[15px] h-[1px] bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
            animate={
              isMenuOpen
                ? { y: 0, rotate: 240, scaleX: 1.5 }
                : { y: -3, rotate: 0, scaleX: 1 }
            }
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
          {/* bottom bar */}
          <Motion.div
            className={`absolute top-1/2 left-1/2 -ml-[7.5px] -mt-[0.75px] w-[15px] h-[1px] bg-accent ${isMenuOpen ? "bg-accent" : "bg-bckg"}`}
            animate={
              isMenuOpen
                ? { y: 0, rotate: 300, scaleX: 1.5 }
                : { y: 3, rotate: 0, scaleX: 1 }
            }
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          />
        </div>
      </div>
    </Motion.div>
  );
};

export default MenuBtn;
