import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const base = import.meta.env.BASE_URL;

const images = {
  img9: `${base}images/loader/loader-01.webp`,
  img8: `${base}images/loader/loader-02.webp`,
  img7: `${base}images/loader/loader-03.webp`,
  img6: `${base}images/loader/loader-04.webp`,
  img5: `${base}images/loader/loader-05.webp`,
  img4: `${base}images/loader/loader-06.webp`,
  img3: `${base}images/loader/loader-07.webp`,
  img2: `${base}images/loader/loader-08.webp`,
  img1: `${base}images/loader/loader-09.webp`,
  img19: `${base}images/loader/loader-10.webp`,
  img18: `${base}images/loader/loader-11.webp`,
  img17: `${base}images/loader/loader-12.webp`,
  img16: `${base}images/loader/loader-13.webp`,
  img15: `${base}images/loader/loader-14.webp`,
  img14: `${base}images/loader/loader-15.webp`,
  img13: `${base}images/loader/loader-16.webp`,
  img12: `${base}images/loader/loader-17.webp`,
  img11: `${base}images/loader/loader-18.webp`,
  img10: `${base}images/loader/loader-19.webp`,
  img24: `${base}images/loader/loader-20.webp`,
  img23: `${base}images/loader/loader-21.webp`,
  img22: `${base}images/loader/loader-22.webp`,
  img21: `${base}images/loader/loader-23.webp`,
  img20: `${base}images/loader/loader-24.webp`,
};

const NUMBER_SEQUENCE = [0, 23, 48, 71, 100];

// Three nested squares. The first one is exactly one grid cell; the others
// grow outward from it (percent of the cell size), each with its own timing,
// easing and drawing direction.
const SQUARES = [
  { inset: "0%", duration: 0.4, delay: 0, ease: "expo.out", reverse: false },
  {
    inset: "-12%",
    duration: 0.55,
    delay: 0.08,
    ease: "power3.out",
    reverse: true,
  },
  {
    inset: "-24%",
    duration: 0.7,
    delay: 0.16,
    ease: "power2.out",
    reverse: false,
  },
];

// Desktop: 5 columns, 5 rows each
const desktopColumns = [
  { class: "c-1", images: ["img1", "img2", "img3", "img4", "img5"] },
  { class: "c-2", images: ["img6", "img7", "img8", "img9", "img10"] },
  { class: "c-3", images: ["img11", "img12", null, "img13", "img14"] },
  { class: "c-4", images: ["img15", "img16", "img17", "img18", "img19"] },
  { class: "c-5", images: ["img20", "img21", "img22", "img23", "img24"] },
];

// Mobile: 3 columns, 3 rows each
const mobileColumns = [
  { class: "c-1", images: ["img1", "img3", "img4"] },
  { class: "c-2", images: ["img6", null, "img9"] },
  { class: "c-3", images: ["img11", "img12", "img8"] },
];

export default function Loader({ onComplete }) {
  const timelineRef = useRef(null);
  const numberRef = useRef(null);
  const rectRefs = useRef([]);
  const counterContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columns = isMobile ? mobileColumns : desktopColumns;

  useEffect(() => {
    // =============
    // SQUARE PROGRESS SETUP
    // The box is exactly one grid cell (1/5 x 1/5 on desktop, 1/3 x 1/3 on
    // mobile), so we measure it and draw the outline in real pixels.
    // =============
    const stroke = 1;
    const rects = rectRefs.current.filter(Boolean);

    const perimeters = rects.map((rect) => {
      const box = rect.parentNode.getBoundingClientRect();

      rect.setAttribute("x", stroke / 2);
      rect.setAttribute("y", stroke / 2);
      rect.setAttribute("width", box.width - stroke);
      rect.setAttribute("height", box.height - stroke);

      const perimeter = rect.getTotalLength();
      gsap.set(rect, {
        strokeDasharray: perimeter,
        strokeDashoffset: perimeter,
      });
      return perimeter;
    });

    const tl = gsap.timeline({ delay: 0.3 });

    // =============
    // COUNTER + SQUARE ANIMATION
    // =============

    NUMBER_SEQUENCE.forEach((num, i) => {
      const progress = num / 100;

      // Animate number
      tl.to(
        numberRef.current,
        {
          opacity: 0.5,
          innerText: num,
          duration: 0.3,
          snap: { innerText: 1 },
          ease: "power2.inOut",
        },
        i * 0.5,
      );

      tl.to(
        numberRef.current,
        {
          opacity: 1,
          innerText: num,
          duration: 0.4,
          snap: { innerText: 1 },
          ease: "power2.inOut",
        },
        i * 0.5,
      );

      // Draw each square outline with its own timing
      rects.forEach((rect, idx) => {
        const { duration, delay, ease } = SQUARES[idx];
        tl.to(
          rect,
          {
            strokeDashoffset: perimeters[idx] * (1 - progress),
            duration,
            ease,
          },
          i * 0.5 + delay,
        );
      });
    });

    tl.to(
      counterContainerRef.current,
      {
        opacity: 0,
        rotateX: 75,
        duration: 0.75,
        scale: 0.75,
        ease: "expo.in",
      },
      "-=0.1",
    );

    // =============
    // IMAGE GRID ANIMATION
    // =============

    tl.to(
      ".col",
      {
        top: "0",
        duration: 2.5,
        ease: "power4.in",
      },
      "-=1.65",
    );

    if (isMobile) {
      // Mobile: 3 columns animation
      tl.to(
        ".c-1 .item",
        {
          top: "0",
          stagger: 0.2,
          duration: 2.5,
          ease: "expo.out",
        },
        "-=2",
      );

      tl.to(
        ".c-3 .item",
        {
          top: "0",
          stagger: 0.2,
          duration: 2.5,
          ease: "expo.out",
        },
        "<",
      );

      tl.to(
        ".c-2 .item",
        {
          top: "0",
          stagger: -0.15,
          duration: 2.5,
          ease: "expo.out",
        },
        "-=3",
      );
    } else {
      // Desktop: 5 columns animation
      tl.to(
        ".c-1 .item",
        {
          top: "0",
          stagger: 0.2,
          duration: 3,
          ease: "expo.out",
        },
        "-=2",
      );

      tl.to(
        ".c-5 .item",
        {
          top: "0",
          stagger: 0.2,
          duration: 3,
          ease: "expo.out",
        },
        "<",
      );

      tl.to(
        ".c-2 .item",
        {
          top: "0",
          stagger: -0.2,
          duration: 3,
          ease: "expo.out",
        },
        "-=4",
      );

      tl.to(
        ".c-4 .item",
        {
          top: "0",
          stagger: -0.2,
          duration: 3,
          ease: "expo.out",
        },
        "-=4",
      );

      tl.to(
        ".c-3 .item",
        {
          top: "0",
          stagger: 0.1,
          duration: 3,
          ease: "expo.out",
        },
        "-=4",
      );
    }

    tl.to(
      ".grid-container",
      {
        scale: 5,
        duration: 2,
        ease: "expo.inOut",
        onComplete: () => {
          if (onComplete) onComplete();
        },
      },
      "<2",
    );

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [onComplete, isMobile]);

  return (
    <div className="fixed inset-0 z-50 w-screen h-[100dvh] overflow-hidden bg-bckg">
      {/* Counter with square outline (on top) */}
      <div
        ref={counterContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Same size as one grid cell: 1/3 of screen on mobile (3x3 grid),
            1/5 of screen on desktop (5x5 grid) */}
        <div className="relative flex items-center justify-center w-1/3 h-1/3 md:w-1/5 md:h-1/5">
          {SQUARES.map((sq, idx) => (
            <div
              key={idx}
              className="absolute"
              style={{
                inset: sq.inset,
                transform: sq.reverse ? "scaleX(-1)" : undefined,
              }}
            >
              <svg className="w-full h-full overflow-visible">
                <rect
                  ref={(el) => (rectRefs.current[idx] = el)}
                  fill="none"
                  stroke="#ffffff80"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          ))}

          <div
            ref={numberRef}
            className="text-white text-4xl md:text-6xl font-bold tabular-nums opacity-0"
          >
            0
          </div>
        </div>
      </div>

      {/* 🖼️ Image Grid (behind counter initially) */}
      <div className="grid-container fixed w-full h-full flex gap-[0.2em]">
        {columns.map((col, colIndex) => (
          <div
            key={colIndex}
            className={`col ${col.class} relative flex-1 w-full flex flex-col gap-[0.2em] ${
              colIndex % 2 === 0 ? "top-full" : "-top-full"
            }`}
          >
            {col.images.map((imgKey, imgIndex) => (
              <div
                key={imgIndex}
                className={`item relative flex-1 w-full overflow-hidden ${
                  colIndex % 2 === 0 ? "top-full" : "-top-full"
                }`}
              >
                {imgKey && images[imgKey] && (
                  <img
                    src={images[imgKey]}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
