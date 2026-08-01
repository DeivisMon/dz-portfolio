import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useResponsive } from "./hooks/useResponsive";
import DesktopPageTransitions from "./components/layout/DesktopPageTransitions";
import MobilePageTransition from "./components/layout/MobilePageTransition";
import Loader from "./components/utils/Loader";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import NavBar from "./components/layout/NavBar";
import CustomCursor from "./components/utils/CustomCursor";
import MovingBackground from "./components/utils/MovingBackgound";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const responsive = useResponsive();

  return (
    <>
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {isLoaded && (
        <>
          {responsive.isDesktop &&
          !responsive.isTablet &&
          !responsive.isMobile ? (
            <>
              <MovingBackground />
              <div className="fixed right-0 top-0 flex w-full h-[188px] bg-bckg/35 z-[1]"></div>
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
              <MovingBackground />
              <div className="fixed right-0 top-0 flex w-full h-[56px] bg-bckg/35 z-[1]"></div>
              <NavBar />
              <AnimatePresence mode="wait">
                <MobilePageTransition key={location.pathname}>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Index />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/kontaktai" element={<Contact />} />
                    <Route path="/apie-mane" element={<AboutMe />} />
                  </Routes>
                </MobilePageTransition>
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
