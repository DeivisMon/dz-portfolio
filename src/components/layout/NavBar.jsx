import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  motion as Motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import AnimatedText from "../utils/AnimatedText";
import Socials from "../utils/Socials";
import Marquee from "../utils/Marquee";
import MovingBackground from "../utils/MovingBackgound";
import HoverLines from "../utils/HoverLines";
import { useResponsive } from "../../hooks/useResponsive";
import { usePageTransition } from "../../context/TransitionContext";
import ClockWithCity from "../utils/ClockWithCity";
import PhotographerQuoteSlide from "../utils/PhotographerQuoteSlide";
import MenuBtn from "../utils/MenuButton";
import { ViewfinderFrame } from "../utils/ViewFinder";
import MenuOverlayLines from "../utils/MenuOverlayLines";

// Timing constants — keep these in sync with the transition objects below.
// handleNavClick uses them to delay navigation until the overlay has
// actually finished closing, avoiding a flash of the new route underneath
// a still-animating menu.
const NAV_EXIT_DELAY = 0.5; // seconds
const NAV_EXIT_DURATION = 0.75; // seconds
const MAGNETIC_STRENGTH = 0.3;

const NAV_ITEMS = [
  { path: "/", label: "Pradžia" },
  { path: "/portfolio", label: "Galerija" },
  { path: "/kontaktai", label: "Info" },
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
      delay: 0.25,
      ease: [0.53, 0.2, 0.17, 1],
    },
  },
};

const navLinkVariants = {
  initial: {
    y: -50,
    opacity: 0,
  },

  animate: ({ i, isDesktop, isHovered, hoveredItem }) => ({
    y: 0,
    opacity: !isDesktop || hoveredItem === null || isHovered ? 1 : 0.2,
    transition: {
      y: {
        duration: 0.75,
        delay: 0.6 + i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }),

  exit: ({ i }) => ({
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: (NAV_ITEMS.length - 1 - i) * 0.05,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const dateVariants = {
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 2.15, ease: [0.22, 1, 0.36, 1] },
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
    transition: { duration: 1.25, delay: 1.75, ease: [0.82, 1, 0.36, 1] },
  },
};

const lowerLineVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.25, delay: 1.75, ease: [0.82, 1, 0.36, 1] },
  },
};

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const responsive = useResponsive();
  const magneticRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigatingAway, setIsNavigatingAway] = useState(false);
  const { isTransitioning, setIsTransitioning } = usePageTransition();
  const [hoveredItem, setHoveredItem] = useState(null);

  const isActive = (path) => location.pathname === path;

  // Reset menu state whenever the route actually changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsNavigatingAway(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleNavClick = (path) => {
    if (isNavigatingAway) return;

    if (path === location.pathname) {
      setIsMenuOpen(false);
      return;
    }

    setIsMenuOpen(false);
    setIsNavigatingAway(true);

    setTimeout(() => {
      setIsTransitioning(true);
      navigate(path);
    }, 1000);
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
      {/* Navbar*/}
      <div
        className={`navbar fixed transition-[z-index] ${isTransitioning ? "z-[2000]" : "z-[500]"} mix-blend-exclusion`}
      >
        {/* Shared row: logo left, quote right */}
        <div className="fixed bottom-1 left-0 w-full xl:h-[188px] flex justify-between items-center pointer-events-none ">
          {/* LEFT — logo */}
          <div
            className={`pointer-events-auto transition-[z-index]
          pt-1 xl:pt-0 mt-0 xl:mt-8 pl-2 xl:pl-5
          max-w-[65vw] overflow-hidden flex flex-2 xl:flex-1
          ${isTransitioning ? "z-[2000]" : "z-[500]"}`}
          >
            <div
              className={`logo relative z-[10] 
                [-webkit-text-stroke:2px_white]
              ${
                responsive.isResponsive
                  ? "text-[2.5rem]"
                  : "text-[clamp(2.5rem,10vw+0.5rem,12.5rem)]"
              }`}
            >
              <Link
                className="flex transition-all duration-500 ease-in-out select-none "
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
                  letterSpacing="px-[clamp(1px,0.35vw,8px)]"
                />
              </Link>
            </div>

            <Motion.div
              {...Animations(upperLineVariants)}
              className={`fixed ${responsive.isResponsive ? "top-1" : "top-5"}  left-0 w-full h-[1px] bg-muted/30 origin-left z-1`}
            />
            {/* <Motion.div
              {...Animations(lowerLineVariants)}
              className={`fixed ${responsive.isResponsive ? "top-14" : "top-40"}  left-0 w-full h-[1px] bg-muted/30 origin-right z-1`}
            /> */}
          </div>
        </div>
      </div>
      {/* Clock — fixed */}
      <Motion.span
        {...Animations(dateVariants)}
        className="fixed hidden xl:block right-4 top-0 text-[15px] text-muted/50 uppercase whitespace-nowrap"
      >
        <ClockWithCity />
      </Motion.span>

      {/* RIGHT — quote only now */}
      {/* <div className="fixed inset-0 mx-auto pointer-events-auto flex flex-1 flex-col items-center pr-2 xl:pr-6">
        <Motion.span
          {...Animations(dateVariants)}
          className="hidden xl:block text-[18px] xl:text-[64px] text-header mix-blend-difference"
        >
          <PhotographerQuoteSlide
            textColor="text-header"
            textSize="text-[18px] xl:text-[64px]"
          />
        </Motion.span>
      </div> */}

      {/* Menu */}
      <div
        ref={magneticRef}
        onMouseMove={handleMagneticMove}
        onMouseLeave={resetMagnetic}
        className={`fixed right-0 -top-4 md:-top-8 w-14 h-14 xl:w-54 xl:h-48 flex items-center justify-center isolate ${
          isTransitioning ? "z-[5]" : "z-[1000]"
        }`}
      >
        <MenuBtn
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          springX={springX}
          springY={springY}
          isLocked={isNavigatingAway}
        />
      </div>

      {/* Marquee */}
      <Marquee className="fixed hidden xl:block left-0 top-8 xl:top-5 pt-[1px]" />

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <Motion.div
              {...Animations(overlayVariants)}
              className="fixed top-0 w-full h-[100dvh] flex items-start bg-black/90 justify-center backdrop-blur-2xl z-[999] "
            >
              {/* <MovingBackground triangleCount={16} /> */}

              <div className="fixed flex justify-center items-center w-full h-full pointer-events-none">
                {/* <ViewfinderFrame
                  className="w-[100%] h-[100%]"
                  iso={400}
                  aperture="1.8"
                  shutter="1/250"
                  frameCount={42}
                  battery={77}
                  // focused
                  recording
                ></ViewfinderFrame> */}
              </div>
              <nav
                className={` h-[100dvh] w-full ml-4 flex flex-col items-center ${responsive.isCompactHeight ? "justify-start mt-12" : "justify-center"}  ${
                  responsive.isLandscape ? "gap-4" : "gap-8"
                } `}
              >
                <MenuOverlayLines />
                {NAV_ITEMS.map((item, i) => {
                  const isDesktop =
                    !responsive.isMobile && !responsive.isTablet;
                  const isHovered = hoveredItem === item.path;

                  return (
                    <Motion.div
                      key={item.path}
                      custom={{
                        i,
                        isDesktop,
                        isHovered,
                        hoveredItem,
                      }}
                      {...Animations(navLinkVariants)}
                      className="overflow-hidden"
                    >
                      <Link
                        className={`cursor-trigger text-3xl group/button md:text-3xl lg:text-5xl xl:text-[124px] uppercase tracking-[5px] md:tracking-[20px] transition-colors duration-300  ${
                          isActive(item.path)
                            ? "text-accent"
                            : "text-muted opacity-80"
                        }`}
                        to={item.path}
                        onMouseEnter={() => {
                          if (isDesktop) {
                            setHoveredItem(item.path);
                          }
                        }}
                        onMouseLeave={() => {
                          if (isDesktop) {
                            setHoveredItem(null);
                          }
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.path);
                        }}
                        style={{
                          filter:
                            !isDesktop || hoveredItem === null || isHovered
                              ? "blur(0px)"
                              : "blur(2px)",
                        }}
                      >
                        <HoverLines />
                        {item.label}
                      </Link>
                    </Motion.div>
                  );
                })}
              </nav>

              <div className="fixed left-0 bottom-2 flex justify-center w-full">
                <Socials />
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
          </>
        )}
      </AnimatePresence>
    </>
  );
}
