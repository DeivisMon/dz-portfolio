import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "../../context/TransitionContext";
import {
  FiMaximize2,
  FiX,
  FiEye,
  FiArrowUp,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiCopy,
} from "react-icons/fi";

const ICONS = {
  expand: FiMaximize2,
  close: FiX,
  view: FiEye,
  up: FiArrowUp,
  link: FiArrowUpRight,
  prev: FiChevronLeft,
  next: FiChevronRight,
  copy: FiCopy,
};

// Lerp
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Global cursor position
let globalCursor = { x: 0, y: 0 };

// Cursor element
const CursorElement = ({
  size,
  filled = false,
  scaleOnEnter = 1,
  scaleOnClick = 0.8,
  isClicking = false,
  opacityOnEnter = 1,
  amount = 0.2,
  isHovered,
  isOutside = false,
  showIcon = false,
  iconType = null,
}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const boundsRef = useRef(null);
  const renderedStyles = useRef({
    tx: { previous: 0, current: 0, amount },
    ty: { previous: 0, current: 0, amount },
    scale: { previous: 1, current: 1, amount },
    opacity: { previous: 1, current: 1, amount },
  });
  const [isVisible, setIsVisible] = useState(false);

  // Calculate bounds once
  useEffect(() => {
    if (elementRef.current) {
      boundsRef.current = { width: size, height: size };
    }
  }, [size]);

  // Handle hover state changes
  useEffect(() => {
    const styles = renderedStyles.current;

    if (isClicking) {
      styles.scale.current = scaleOnClick;
    } else if (isHovered) {
      styles.scale.current = scaleOnEnter;
    } else {
      styles.scale.current = 1;
    }

    styles.opacity.current = isHovered ? opacityOnEnter : 1;
  }, [isHovered, isClicking, scaleOnEnter, opacityOnEnter, scaleOnClick]);

  // Animation loop
  const animate = useCallback(() => {
    if (!elementRef.current || !boundsRef.current) return;

    const styles = renderedStyles.current;
    const bounds = boundsRef.current;

    // Update current positions based on global cursor
    styles.tx.current = globalCursor.x - bounds.width / 2;
    styles.ty.current = globalCursor.y - bounds.height / 2;

    // Interpolate all values
    for (const key in styles) {
      styles[key].previous = lerp(
        styles[key].previous,
        styles[key].current,
        styles[key].amount,
      );
    }

    // Apply transforms
    elementRef.current.style.transform = `translateX(${styles.tx.previous}px) translateY(${styles.ty.previous}px) scale(${styles.scale.previous})`;
    // elementRef.current.style.opacity = styles.opacity.previous;

    // Continue animation
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation on first mouse move
  useEffect(() => {
    const handleFirstMove = () => {
      if (!boundsRef.current) return;

      const styles = renderedStyles.current;
      const bounds = boundsRef.current;

      // Set initial positions
      styles.tx.previous = styles.tx.current =
        globalCursor.x - bounds.width / 2;
      styles.ty.previous = styles.ty.current =
        globalCursor.y - bounds.height / 2;

      // Show element
      setIsVisible(true);

      // Start animation loop
      animate();

      window.removeEventListener("mousemove", handleFirstMove);
    };

    window.addEventListener("mousemove", handleFirstMove);

    return () => {
      window.removeEventListener("mousemove", handleFirstMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // Icon components
  const renderIcon = () => {
    if (!showIcon) return null;

    const IconComp = iconType ? ICONS[iconType] : null;

    function easeOutBounce(x) {
      const n1 = 7.5625;
      const d1 = 2.75;

      if (x < 1 / d1) {
        return n1 * x * x;
      } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
      } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
      } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
      }
    }

    function easeOutElastic(x) {
      return x < 0.5
        ? (1 - easeOutBounce(1 - 2 * x)) / 2
        : (1 + easeOutBounce(2 * x - 1)) / 2;
    }

    return (
      <AnimatePresence mode="wait">
        {iconType && (
          <motion.div
            key={iconType}
            initial={{ opacity: 0.25, rotate: -45, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0.25, rotate: 45, scale: 0.85 }}
            transition={{ duration: 0.175, ease: easeOutElastic }}
            className="flex items-center justify-center mix-blend-difference"
          >
            {IconComp ? (
              <IconComp size={size * 0.35} color="white" />
            ) : (
              <span className="text-white text-[10px] font-medium tracking-wide select-none whitespace-nowrap">
                {iconType}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div
      ref={elementRef}
      className={`fixed top-0 left-0 pointer-events-none z-[10000] rounded-full
      flex items-center justify-center transition-opacity duration-300 ease-in-out
      ${filled ? "bg-white" : "border border-white"}
      ${isVisible && !isOutside ? "opacity-100" : "opacity-0"} mix-blend-difference`}
      style={{ width: size, height: size }}
    >
      {renderIcon()}
    </div>
  );
};

// Main cursor component
const CustomCursor = ({ triggerSelector = ".cursor-trigger" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [iconType, setIconType] = useState(null);
  const [showCursor, setShowCursor] = useState(false);
  const [isOutside, setIsOutside] = useState(false);
  const { isTransitioning } = usePageTransition();
  const [isClicking, setIsClicking] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setIsOutside(true);
      }
    };

    const handleMouseOver = (e) => {
      if (!e.relatedTarget && !e.fromElement) {
        setIsOutside(false); // entered viewport
      }
    };

    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Global mouse position
  useEffect(() => {
    const updateCursor = (e) => {
      globalCursor.x = e.clientX;
      globalCursor.y = e.clientY;
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  // Function to check what element is currently under the cursor
  const checkElementUnderCursor = useCallback(() => {
    const elementUnderCursor = document.elementFromPoint(
      globalCursor.x,
      globalCursor.y,
    );
    if (!elementUnderCursor) return;

    const triggerElement = elementUnderCursor.closest(triggerSelector);

    if (triggerElement) {
      setIsHovered(true);

      const cursorType =
        triggerElement.dataset.cursorType ||
        triggerElement.getAttribute("data-cursor") ||
        (triggerElement.classList.contains("cursor-expand")
          ? "expand"
          : triggerElement.classList.contains("cursor-close")
            ? "close"
            : triggerElement.classList.contains("cursor-view")
              ? "view"
              : triggerElement.classList.contains("cursor-link")
                ? "link"
                : triggerElement.classList.contains("cursor-up")
                  ? "up"
                  : triggerElement.classList.contains("cursor-next")
                    ? "next"
                    : triggerElement.classList.contains("cursor-prev")
                      ? "prev"
                      : null);

      setIconType(cursorType);
    } else {
      setIsHovered(false);
      setIconType(null);
    }
  }, [triggerSelector]);

  useEffect(() => {
    if (!isTransitioning) {
      if (pollRef.current) cancelAnimationFrame(pollRef.current);
      return;
    }

    const poll = () => {
      checkElementUnderCursor();
      pollRef.current = requestAnimationFrame(poll);
    };
    pollRef.current = requestAnimationFrame(poll);

    return () => {
      if (pollRef.current) cancelAnimationFrame(pollRef.current);
    };
  }, [isTransitioning, checkElementUnderCursor]);

  // Handle hover events and detect cursor type
  useEffect(() => {
    const handleMouseEnter = (e) => {
      setIsHovered(true);

      // Detect cursor type based on element attributes or classes
      const element = e.target.closest(triggerSelector);
      if (!element) return;

      const cursorType =
        element.dataset.cursorType ||
        element.getAttribute("data-cursor") ||
        (element.classList.contains("cursor-expand")
          ? "expand"
          : element.classList.contains("cursor-close")
            ? "close"
            : element.classList.contains("cursor-view")
              ? "view"
              : element.classList.contains("cursor-link")
                ? "link"
                : element.classList.contains("cursor-up")
                  ? "up"
                  : element.classList.contains("cursor-next")
                    ? "next"
                    : element.classList.contains("cursor-prev")
                      ? "prev"
                      : null);

      setIconType(cursorType);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setIconType(null);
    };

    const updateEventListeners = () => {
      const elements = document.querySelectorAll(triggerSelector);

      elements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        elements.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnter);
          el.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    };

    // Initial setup
    const cleanup = updateEventListeners();

    // Listen for DOM changes and re-check cursor state
    const observer = new MutationObserver((mutations) => {
      let shouldRecheck = false;

      mutations.forEach((mutation) => {
        // Check if any nodes were added/removed or attributes changed
        if (
          mutation.type === "childList" ||
          (mutation.type === "attributes" &&
            (mutation.attributeName === "data-cursor-type" ||
              mutation.attributeName === "class"))
        ) {
          shouldRecheck = true;
        }
      });

      if (shouldRecheck) {
        updateEventListeners();
        setTimeout(checkElementUnderCursor, 10);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-cursor-type", "class", "style"],
    });

    return () => {
      cleanup();
      observer.disconnect();
    };
  }, [triggerSelector, checkElementUnderCursor]);

  // Check for fine pointer support
  useEffect(() => {
    const mediaQuery = window.matchMedia("(any-pointer: fine)");
    setShowCursor(mediaQuery.matches);

    const handleChange = (e) => setShowCursor(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Expose the refresh function globally for manual cursor updates
  useEffect(() => {
    window.refreshCursor = checkElementUnderCursor;
    return () => {
      delete window.refreshCursor;
    };
  }, [checkElementUnderCursor]);

  if (!showCursor) return null;

  return (
    <>
      {/* Small filled cursor dot */}
      <CursorElement
        size={24}
        filled={true}
        scaleOnEnter={3.75}
        scaleOnClick={3.25}
        isClicking={isClicking}
        opacityOnEnter={1}
        amount={0.2}
        isHovered={isHovered}
        isOutside={isOutside}
        showIcon={false}
      />

      {/* Large cursor circle with icon */}
      <CursorElement
        size={54}
        filled={true}
        scaleOnEnter={1.75}
        scaleOnClick={1}
        isClicking={isClicking}
        opacityOnEnter={1}
        amount={0.15}
        isHovered={isHovered}
        isOutside={isOutside}
        showIcon={true}
        iconType={iconType}
      />

      {/* Larger cursor circle */}
      <CursorElement
        size={56}
        filled={true}
        scaleOnEnter={1.75}
        scaleOnClick={1.5}
        isClicking={isClicking}
        opacityOnEnter={1}
        amount={0.125}
        isHovered={isHovered}
        isOutside={isOutside}
        showIcon={false}
        iconType={iconType}
      />
    </>
  );
};

export default CustomCursor;
