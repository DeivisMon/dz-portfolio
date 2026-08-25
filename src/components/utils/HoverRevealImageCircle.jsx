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
  transformOrigin: "center",
  willChange: "transform",
};

function HoverRevealImageCircle({
  src,
  height,
  onClick,
  dataCursorType,
  style,
}) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const enterTimelineRef = useRef(null);
  const leaveTimelineRef = useRef(null);

  const handleMouseEnter = () => {
    leaveTimelineRef.current?.kill();

    enterTimelineRef.current = gsap
      .timeline({ defaults: { duration: 0.9, ease: "expo" } })
      .set(bottomRef.current, { willChange: "filter" })
      .set(topRef.current, { willChange: "clip-path" })
      .fromTo(
        topRef.current,
        { clipPath: "circle(70.7% at 50% 50%)" },
        { clipPath: "circle(0% at 50% 50%)" },
        0,
      )
      .fromTo(
        bottomRef.current,
        {
          scale: 1,
          filter: "brightness(80%) contrast(200%) hue-rotate(-90deg)",
        },
        {
          scale: 1.15,
          filter: "brightness(100%) contrast(100%) hue-rotate(0deg)",
        },
        0,
      );
  };

  const handleMouseLeave = () => {
    enterTimelineRef.current?.kill();

    leaveTimelineRef.current = gsap
      .timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } })
      .set(bottomRef.current, { willChange: "filter" })
      .set(topRef.current, { willChange: "clip-path" })
      .to(topRef.current, { clipPath: "circle(70.7% at 50% 50%)" }, 0)
      .to(
        bottomRef.current,
        { filter: "brightness(0%) contrast(400%)", scale: 2 },
        0,
      );
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

export default HoverRevealImageCircle;
