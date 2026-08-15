import { useState, useEffect } from "react";

export function useResponsive() {
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isTouch:
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0),
  }));

  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        isTouch: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      });
    };

    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  // Classify device by its LONG edge so rotating a phone doesn't
  // reclassify it as a tablet (phones hit ~930px wide in landscape).
  const longEdge = Math.max(viewport.width, viewport.height);
  const isMobile = longEdge < 1024;
  const isTablet = longEdge >= 1024 && longEdge <= 1366;
  const isDesktop = longEdge > 1366;

  const isLandscape = viewport.width > viewport.height;
  const isPortrait = !isLandscape;

  // Vertical space is tight *right now* — independent of device class.
  // This is what layout-squeeze logic (logo size, line spacing, menu
  // gap) should key off, not isMobile/isLandscape.
  const isCompactHeight = viewport.height < 500;

  return {
    ...viewport,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    isCompactHeight,
    isMobilePortrait: isMobile && isPortrait,
    isMobileLandscape: isMobile && isLandscape,
    isTabletPortrait: isTablet && isPortrait,
    isTabletLandscape: isTablet && isLandscape,
    isResponsive: isMobile || isTablet,
    isResponsivePortait: (isTablet && isPortrait) || (isMobile && isPortrait),
  };
}
