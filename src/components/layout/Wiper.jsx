import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Wiper() {
  const wipeContainerRef = useRef(null);

  useEffect(() => {
    const bars = gsap.utils
      .toArray(wipeContainerRef.current.children)
      .reverse();

    gsap.set(wipeContainerRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline({});
    bars.forEach((bar, i) => {
      tl.to(
        bar,
        {
          scaleX: 0,
          duration: 0.2 + i * 0.15,
          //   opacity: 0.9,
          delay: 0.85,
          ease: "power4.inOut",
        },
        i * 0.05,
      );
    });
  }, []);

  return (
    <>
      {/* Wipe screen */}
      <div
        ref={wipeContainerRef}
        className="fixed inset-0 z-50 pointer-events-none flex flex-row-reverse "
        style={{ opacity: 0 }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-bckg"
            style={{
              flex: 1,
              transformOrigin: "bottom top",
            }}
          />
        ))}
      </div>
    </>
  );
}
