import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useResponsive } from "./hooks/useResponsive";
import { useSliderStore } from "./store/sliderStore";
import DesktopPageTransitions from "./components/layout/DesktopPageTransitions";
import Loader from "./components/utils/NewLoader";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import NavBar from "./components/layout/NavBar";
import CustomCursor from "./components/utils/CustomCursor";
import MovingBackground from "./components/utils/MovingBackgound";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const initSelection = useSliderStore((s) => s.initSelection);
  const markHandoff = useSliderStore((s) => s.markHandoff);
  const location = useLocation();
  const responsive = useResponsive();

  useEffect(() => {
    initSelection();
  }, [initSelection]);

  return (
    <>
      {!isLoaded && (
        <Loader
          onComplete={() => {
            markHandoff();
            setIsLoaded(true);
          }}
        />
      )}

      {isLoaded && (
        <>
          {responsive.isDesktop &&
          !responsive.isTablet &&
          !responsive.isMobile ? (
            <>
              <MovingBackground />
              <NavBar />
              <AnimatePresence mode="wait">
                <DesktopPageTransitions key={location.pathname}>
                  <Routes location={location}>
                    <Route path="/" element={<Index />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/kontaktai" element={<Contact />} />
                    <Route path="/apie-mane" element={<AboutMe />} />
                  </Routes>
                </DesktopPageTransitions>
              </AnimatePresence>
            </>
          ) : (
            <>
              <NavBar />
              <AnimatePresence mode="wait">
                <DesktopPageTransitions key={location.pathname}>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Index />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/kontaktai" element={<Contact />} />
                    <Route path="/apie-mane" element={<AboutMe />} />
                  </Routes>
                </DesktopPageTransitions>
              </AnimatePresence>
            </>
          )}
          {responsive.isDesktop &&
            !responsive.isTablet &&
            !responsive.isMobile && <CustomCursor />}
        </>
      )}
    </>
  );
}
