import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import AnimatedText from "../utils/AnimatedText";

gsap.registerPlugin(CustomEase, SplitText);

// Single set of images — they stack on top of each other and wipe in one
// at a time, each new one covering the last (same behavior as the original).
const defaultImages = [
  "./images/gallery/bw/bw-01.webp",
  "./images/gallery/bw/bw-02.webp",
  "./images/gallery/bw/bw-03.webp",
  "./images/gallery/bw/bw-04.webp",
  "./images/gallery/bw/bw-05.webp",
  "./images/gallery/bw/bw-06.webp",
];

export default function Loader({ images = defaultImages, onComplete }) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const preloaderImages = gsap.utils.toArray(".preloader-images .img");
      const preloaderImagesInner = gsap.utils.toArray(
        ".preloader-images .img img",
      );

      const tl = gsap.timeline({
        delay: 0.75,
      });

      // Progress bar
      tl.to(".progress-bar", {
        scaleX: 1,
        duration: 4,
        ease: "power3.inOut",
      })
        .set(".progress-bar", { transformOrigin: "right" })
        .to(".progress-bar", {
          scaleX: 0,
          duration: 1,
          ease: "power3.in",
        });

      // Images wipe in one at a time, each covering the previous one
      preloaderImages.forEach((img, index) => {
        tl.to(
          img,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5",
        );
      });

      preloaderImagesInner.forEach((img, index) => {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1.5,
            ease: "hop",
            delay: index * 0.75,
          },
          "-=5.25",
        );
      });

      // Image stack closes
      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        },
        "-=1.5",
      );

      tl.to(
        ".preloader-header",
        {
          scaleY: 0.35,
          duration: 1.75,
          opacity: 0,
          ease: "hop",
          onStart: () => {
            gsap.set(".preloader-header", { mixBlendMode: "difference" });
          },
          onComplete: () => {
            if (onComplete) onComplete();
          },
        },
        "<",
      );

      // Preloader curtain closes
      tl.to(
        ".preloader",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1.75,
          ease: "hop",
        },
        "-=0.15",
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scopeRef}>
      <div className="preloader fixed bg-bckg top-0 z-[2000]">
        <div className="progress-bar" />

        <div className="preloader-images">
          {images.map((src, i) => (
            <div className="img" key={i}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="preloader-header logo xl:text-[184px] mix-blend-difference text-header font-bold">
        <AnimatedText
          text="Žvinklys"
          textColor="text-header"
          duration={0.75}
          delay={0.15}
          delayChildren={0.5}
          enableHover={false}
          scaleX="scale-x-152"
          textShadow="text-shadow-lg/40"
          letterSpacing={"px-[8px]"}
        />
      </div>
    </div>
  );
}
