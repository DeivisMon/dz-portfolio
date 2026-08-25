import { useEffect, useRef } from "react";
import gsap from "gsap";

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "100%",
};

const imgLayerStyle = {
  position: "absolute",
  inset: 0,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "noRepeat",
  transformOrigin: "center",
  willChange: "transform",
};

function HoverRevealImage({ src, height, onClick, dataCursorType, style }) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const enterTimelineRef = useRef(null);
  const leaveTimelineRef = useRef(null);

  const handleMouseEnter = () => {
    leaveTimelineRef.current?.kill();

    enterTimelineRef.current = gsap
      .timeline({ defaults: { duration: 0.5, ease: "power3.out" } })
      .set(topRef.current, { willChange: "clip-path" })
      .fromTo(
        topRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
        0,
      )
      .fromTo(
        bottomRef.current,
        { scale: 1, filter: "brightness(400%) hue-rotate(-270deg)" },
        { scale: 1.05, filter: "brightness(100%) hue-rotate(0deg)" },
        0,
      );
  };

  const handleMouseLeave = () => {
    enterTimelineRef.current?.kill();

    leaveTimelineRef.current = gsap
      .timeline({ defaults: { duration: 0.6, ease: "power3.out" } })
      .set(topRef.current, { willChange: "clip-path" })
      .fromTo(
        topRef.current,
        { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        0,
      )
      .fromTo(bottomRef.current, { scale: 1.05 }, { scale: 1 }, 0);
  };

  useEffect(() => {
    return () => {
      enterTimelineRef.current?.kill();
      leaveTimelineRef.current?.kill();
    };
  }, [src]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-type={dataCursorType}
      className="cursor-trigger"
      style={{ ...containerStyle, height, ...style }}
    >
      <div
        ref={bottomRef}
        style={{ ...imgLayerStyle, backgroundImage: `url(${src})`, zIndex: 1 }}
      />
      <div
        ref={topRef}
        style={{ ...imgLayerStyle, backgroundImage: `url(${src})`, zIndex: 2 }}
      />
    </div>
  );
}

export default HoverRevealImage;
