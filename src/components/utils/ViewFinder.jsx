import { useEffect, useState } from "react";
import { Aperture, BatteryMedium } from "lucide-react";
import { motion as Motion } from "framer-motion";

/**
 * ViewfinderFrame
 * A reusable camera-viewfinder HUD overlay. Wrap any content (a photo, a
 * video, a card, a gradient — anything) and it renders on top: rule-of-thirds
 * grid, AF corner brackets, a center focus reticle, and exposure readouts,
 * exactly like looking through an SLR/mirrorless finder.
 *
 * Usage:
 *   <ViewfinderFrame iso={400} aperture="2.8" shutter="1/125" focused>
 *     <img src="..." className="h-full w-full object-cover" />
 *   </ViewfinderFrame>
 */
const Animations = (variants) => ({
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants,
});

const overlayVariants = {
  initial: { scale: 0.25, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.5, ease: [0.87, 0, 0.13, 1] },
  },
  exit: {
    scale: 0.25,
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0.25,
      ease: [0.53, 0.2, 0.17, 1],
    },
  },
};

export function ViewfinderFrame({
  children,
  className = "",
  iso = 200,
  aperture = "2.8",
  shutter = "1/125",
  frameCount = 1,
  battery = 100,
  focused = true,
  showGrid = true,
  recording = false,
}) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (!recording) return undefined;
    const id = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(id);
  }, [recording]);

  return (
    <Motion.div
      {...Animations(overlayVariants)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* the actual scene/content being viewed */}
      <div className="absolute inset-0 mx-auto my-auto">{children}</div>

      {/* ---- HUD overlay ---- */}
      <div className="pointer-events-none absolute inset-0 select-none font-mono text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
        {/* rule of thirds grid */}
        {/* {showGrid && (
          <div className="absolute inset-0 opacity-[0.35]">
            <div className="absolute left-1/3 top-0 h-full w-px bg-white/60" />
            <div className="absolute left-2/3 top-0 h-full w-px bg-white/60" />
            <div className="absolute top-1/3 left-0 w-full h-px bg-white/60" />
            <div className="absolute top-2/3 left-0 w-full h-px bg-white/60" />
          </div>
        )} */}

        {/* AF corner brackets */}
        <div className="absolute top-1 inset-x-0 mx-auto w-[clamp(64px,20vw,336px)] border-t-1 border-l-1 border-muted/50" />
        <div className="absolute top-1 left-1 h-5 w-16 border-t-1 border-l-1 border-muted/50" />
        <div className="absolute top-1 right-1 h-5 w-16 border-t-1 border-r-1 border-muted/50" />
        <div className="absolute bottom-1 left-1 h-5 w-16 border-b-1 border-l-1 border-muted/50" />
        <div className="absolute bottom-1 right-1 h-5 w-16 border-b-1 border-r-1 border-muted/50" />
        <div className="absolute bottom-1 inset-x-0 mx-auto w-[clamp(64px,20vw,336px)] border-b-1 border-r-1 border-muted/50" />

        {/* center focus reticle — turns green when focus is confirmed */}
        {/* <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 border-2 transition-colors duration-300 ${
            focused ? "border-emerald-400" : "border-white/70"
          }`}
        >
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 h-px w-2 bg-current" />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 h-px w-2 bg-current" />
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-px h-2 bg-current" />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-px h-2 bg-current" />
        </div>
        {focused && (
          <span className="absolute top-1/2 left-1/2 translate-x-6 -translate-y-6 text-[10px] tracking-[0.15em] text-emerald-400">
            AF
          </span>
        )} */}

        {/* recording indicator, top-left */}
        {recording && (
          <div className="absolute top-2 left-4 flex items-center gap-1.5 text-[10px] tracking-[0.15em]">
            <span
              className={`h-2 w-2 rounded-full bg-red-500 transition-opacity duration-150 ${
                blink ? "opacity-100" : "opacity-20"
              }`}
            />
            REC
          </div>
        )}

        {/* battery, top-right */}
        <div className="absolute top-2 right-4 flex items-center gap-1 text-[10px] tracking-[0.1em]">
          <BatteryMedium className="h-3.5 w-3.5" />
          {battery}%
        </div>

        {/* exposure readout, bottom-left */}
        <div className="absolute bottom-2 left-4 flex items-center gap-2.5 text-[10px] tracking-[0.1em]">
          <span>ISO {iso}</span>
          <span className="flex items-center gap-0.5">
            <Aperture className="h-3 w-3" />
            {aperture}
          </span>
          <span>{shutter}s</span>
        </div>

        {/* frame counter, bottom-right */}
        <div className="absolute bottom-2 right-4 text-[10px] tracking-[0.1em]">
          {String(frameCount).padStart(4, "0")}
        </div>
      </div>
    </Motion.div>
  );
}

// --- demo: swap the gradient below for a real <img>/<video>/anything else ---
// export default function ViewfinderDemo() {
//   return (
//     <div className="w-full flex items-center justify-center p-6">
//       <ViewfinderFrame
//         className="w-full max-w-2xl h-[420px]"
//         iso={400}
//         aperture="1.8"
//         shutter="1/250"
//         frameCount={42}
//         battery={78}
//         focused
//         recording
//       >
//         <div className="h-full w-full bg-gradient-to-br from-stone-700 via-stone-900 to-black" />
//       </ViewfinderFrame>
//     </div>
//   );
// }
