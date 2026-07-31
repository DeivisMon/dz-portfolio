import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import AnimatedText from "../utils/AnimatedText";
import SocialIcons from "../utils/SocialIcons";
import Frame from "../utils/Frame(Menu overlay)";
import { useResponsive } from "../../hooks/useResponsive";
import { usePageTransition } from "../../context/TransitionContext";
import ClockWithCity from "../utils/ClockWithCity";
import MenuBtn from "../utils/MenuButton";

// Timing constants — keep these in sync with the transition objects below.
// handleNavClick uses them to delay navigation until the overlay has
// actually finished closing, avoiding a flash of the new route underneath
// a still-animating menu.
const NAV_EXIT_DELAY = 0.5; // seconds
const NAV_EXIT_DURATION = 0.9; // seconds
const MAGNETIC_STRENGTH = 0.3;

const NAV_ITEMS = [
  { path: "/", label: "Pradžia" },
  { path: "/portfolio", label: "Galerija" },
  { path: "/kontaktai", label: "Info" },
];

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
  "Studijinė fotografija",
];

// Animation variants

const Animations = (variants) => ({
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants,
});

const overlayVariants = {
  initial: { y: "-100%" },
  animate: {
    y: 0,
    transition: { duration: 0.75, delay: 0.25, ease: [0.87, 0, 0.13, 1] },
  },
  exit: {
    y: "100%",
    transition: {
      duration: NAV_EXIT_DURATION,
      delay: NAV_EXIT_DELAY,
      ease: [0.53, 0.2, 0.17, 1],
    },
  },
};

const navLinkVariants = {
  initial: { y: -50, opacity: 0 },
  animate: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.6 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: (i) => ({
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: 0.3 - i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const dateVariants = {
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 2.85, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    y: 10,
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const upperLineVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.75, delay: 2.25, ease: [0.22, 1, 0.36, 1] },
  },
  // exit: {
  //   scaleX: 50,
  //   opacity: 0,
  //   transition: {
  //     duration: 0.25,
  //     delay: 0.3,
  //     ease: [0.22, 1, 0.36, 1],
  //   },
  // },
};

const lowerLineVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.25, delay: 1.75, ease: [0.22, 1, 0.36, 1] },
  },
  // exit: {
  //   scaleX: 50,
  //   opacity: 0,
  //   transition: {
  //     duration: 0.25,
  //     delay: 0.3,
  //     ease: [0.22, 1, 0.36, 1],
  //   },
  // },
};

const Marquee = ({
  items,
  textColor = "text-header",
  speed = 50,
  textSize = "text-xs xl:text-xl",
  className = "",
}) => {
  const firstGroupRef = useRef(null);
  const [groupWidth, setGroupWidth] = useState(0);

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
      className="flex shrink-0 items-center bg-bckg whitespace-nowrap"
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
};

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const responsive = useResponsive();
  const magneticRef = useRef(null);
  const now = new Date();
  const month = now.toLocaleDateString("lt-LT", { month: "long" });
  const year = now.getFullYear().toString().slice(-2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);
  const { isTransitioning, setIsTransitioning } = usePageTransition();

  const isActive = (path) => location.pathname === path;

  // Reset menu state whenever the route actually changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsNavigatingAway(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavClick = (path) => {
    if (path === location.pathname) {
      setIsMenuOpen(false);
      return;
    }
    setIsMenuOpen(false);
    setIsNavigatingAway(true);
    setTimeout(
      () => {
        setIsTransitioning(true);
        navigate(path);
      },
      (NAV_EXIT_DELAY + NAV_EXIT_DURATION) * 1000,
    );
  };

  // Magnetic hamburger button
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springX = useSpring(magX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(magY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMagneticMove = (e) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    magX.set((e.clientX - centerX) * MAGNETIC_STRENGTH);
    magY.set((e.clientY - centerY) * MAGNETIC_STRENGTH);
  };

  const resetMagnetic = () => {
    magX.set(0);
    magY.set(0);
  };

  return (
    <>
      {/* Top bar: marquee + date only — logo removed from here */}
      <div
        className={`navbar fixed transition-[z-index] ${isTransitioning ? "z-[2000]" : "z-[500]"}`}
      >
        <Marquee
          items={MARQUEE_ITEMS}
          className={`fixed hidden md:block left-0 top-8 xl:top-[173px]  `}
        />
        <div className="fixed right-0 top-4 w-1/2 h-[36px] xl:h-[204px] flex items-top justify-between px-4 xl:px-2">
          <Motion.span
            {...Animations(dateVariants)}
            className="hidden md:block text-[18px] text-muted uppercase whitespace-nowrap mix-blend-difference"
          >
            {month}' {year}
          </Motion.span>
          <Motion.span
            {...Animations(dateVariants)}
            className="hidden md:block text-[18px] text-muted uppercase whitespace-nowrap mix-blend-difference"
          >
            <ClockWithCity />
          </Motion.span>
          <span></span>
        </div>
      </div>

      {/* Logo: own top-level fixed stacking context, sibling to hamburger */}
      <div
        className={`fixed left-0 top-0 xl:-top-10 w-1/2 overflow-hidden flex flex-col justify-between items-start xl:px-6 mix-blend-difference transition-[z-index] ${
          isTransitioning ? "z-[2000]" : "z-[500]"
        }`}
      >
        <div className="logo text-[24px] xl:text-[204px]">
          <Link
            className="flex transition-all duration-500 ease-in-out"
            to="/"
            onClick={() => handleNavClick("/")}
          >
            <AnimatedText
              text="Žvinklys"
              textColor="text-header"
              duration={0.75}
              delay={0.5}
              delayChildren={1.25}
              enableHover={false}
              scaleX="scale-x-152"
              textShadow="text-shadow-lg/40"
              letterSpacing={
                responsive.isTablet || responsive.isMobile
                  ? "px-[4px] pl-2"
                  : "px-[8px]"
              }
            />
          </Link>
        </div>
        <Motion.div
          {...Animations(upperLineVariants)}
          className={`fixed hidden md:block top-4 left-0 w-[calc(50vw+80px)] h-[1px] bg-muted/50 origin-left`}
        />
        <Motion.div
          {...Animations(lowerLineVariants)}
          className="fixed top-[32px] md:top-42 left-0 w-full h-[1px] bg-muted/50 origin-right"
        />
      </div>

      {/* Hamburger button: white, circular, magnetic */}
      <div
        ref={magneticRef}
        onMouseMove={handleMagneticMove}
        onMouseLeave={resetMagnetic}
        className={`cursor-trigger fixed right-0 -top-2 w-14 h-14 xl:w-54 xl:h-48 flex items-center justify-center mix-blend-difference isolate ${
          isTransitioning ? "z-[5]" : "z-[1000]"
        }`}
      >
        <MenuBtn
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          springX={springX}
          springY={springY}
        />
      </div>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            {...Animations(overlayVariants)}
            className="fixed w-full h-[100dvh] flex items-center justify-center bg-black/90 backdrop-blur-xl z-[999]"
          >
            <nav
              className={` h-[100dvh] w-full flex flex-col items-center justify-center ${
                responsive.isLandscape ? "gap-4" : "gap-8"
              } `}
            >
              {NAV_ITEMS.map((item, i) => (
                <Motion.div
                  key={item.path}
                  custom={i}
                  {...Animations(navLinkVariants)}
                >
                  <Link
                    className={`text-3xl md:text-3xl lg:text-5xl xl:text-[124px] uppercase tracking-[5px] md:tracking-[20px] ${
                      isActive(item.path)
                        ? "italic text-accent"
                        : "text-muted opacity-80"
                    }`}
                    to={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }}
                  >
                    {item.label}
                  </Link>
                </Motion.div>
              ))}
            </nav>

            <div className="fixed left-0 bottom-8 w-full">
              <SocialIcons />
            </div>

            {/* Decorative background logo */}
            {/* <div className="logo hidden xl:block absolute opacity-20 left-0 -bottom-50 text-[24px] xl:text-[460px] pointer-events-none">
              <Link
                className="flex w-full justify-center transition-all duration-500 ease-in-out"
                to="/"
                onClick={() => handleNavClick("/")}
              >
                <AnimatedText
                  text="Žvinklys"
                  textColor="text-header/10"
                  duration={0.5}
                  delay={0.75}
                  delayChildren={0.5}
                  enableHover={false}
                  scaleX="scale-x-160"
                  textShadow="text-shadow-lg/50"
                  letterSpacing={
                    responsive.isTablet || responsive.isMobile
                      ? "px-[4px] pl-2"
                      : "px-[8px]"
                  }
                />
              </Link>
            </div> */}
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
