import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useSliderStore } from "../../store/sliderStore";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase, SplitText);

export default function Loader({ onComplete }) {
  const scopeRef = useRef(null);
  const defaultImages = useSliderStore((s) => s.selectedImages);

  useEffect(() => {
    if (!defaultImages?.length) return;

    const ctx = gsap.context(() => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const preloaderImages = gsap.utils.toArray(".preloader-images .img");
      const preloaderImagesInner = gsap.utils.toArray(
        ".preloader-images .img img",
      );

      // Initial states
      gsap.set(".progress-bar-x", { scaleX: 0 });
      gsap.set(".progress-bar-y", { scaleY: 0 });
      // xPercent/yPercent replicate the CSS translate(-50%,-50%) centering,
      // since GSAP fully owns `transform` once it sets scale on this element.
      gsap.set(".preloader-border", { xPercent: -50, yPercent: -50, scale: 0 });
      gsap.set(".preloader-images", { opacity: 0 });

      const LINES_EXIT_DURATION = 1; // seconds
      const BORDER_GROW_DURATION = 0.6;

      const tl = gsap.timeline({ delay: 0.75 });

      // 1. Cross grows in from center
      tl.addLabel("linesIn")
        .to(
          ".progress-bar-x",
          { scaleX: 1, duration: 0.6, ease: "hop" },
          "linesIn",
        )
        .to(
          ".progress-bar-y",
          { scaleY: 1, duration: 0.6, ease: "hop" },
          "linesIn",
        );

      // 2. Lines start exiting (slow exit)
      tl.addLabel("linesExit", "linesIn+=0.7");
      tl.to(
        ".progress-bar-x",
        { scaleX: 0, duration: LINES_EXIT_DURATION, ease: "power2.inOut" },
        "linesExit",
      ).to(
        ".progress-bar-y",
        { scaleY: 0, duration: LINES_EXIT_DURATION, ease: "power2.inOut" },
        "linesExit",
      );

      // 3. Once lines are 80% through their exit (i.e. 20% left before zero),
      //    the border box starts growing to the exact size of .preloader-images
      tl.addLabel("borderGrow", `linesExit+=${LINES_EXIT_DURATION * 0.8}`);
      tl.to(
        ".preloader-border",
        { scale: 1, duration: BORDER_GROW_DURATION, ease: "hop" },
        "borderGrow",
      );

      // 4. Border finished growing -> reveal image stack, first image wipes in
      tl.addLabel("imagesReveal", `borderGrow+=${BORDER_GROW_DURATION}`);
      tl.set(".preloader-images", { opacity: 1 }, "imagesReveal");

      // fade the border out as images take over
      tl.to(
        ".preloader-border",
        { opacity: 0, duration: 2.5, ease: "power2.out" },
        "imagesReveal",
      );

      // 5. Per-image clip-path wipes, staggered off "imagesReveal"
      preloaderImages.forEach((img, index) => {
        tl.to(
          img,
          {
            scale: 1.15,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          `imagesReveal+=${index * 0.5}`,
        );
      });

      preloaderImagesInner.forEach((img, index) => {
        tl.to(
          img,
          {
            scale: 1,
            duration: 1,
            ease: "hop",
          },
          `imagesReveal+=${index * 0.5 + 0.25}`,
        );
      });

      // Image stack closes (final wipe out)
      const lastImageStart =
        "imagesReveal+=" + ((preloaderImages.length - 1) * 0.5 + 1);

      tl.to(
        ".preloader-images",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.375,
          ease: "hop",
          onComplete: () => {
            if (onComplete) onComplete();
          },
        },
        `${lastImageStart}+=0.5`,
      );
    }, scopeRef);

    return () => ctx.revert();
  }, [defaultImages, onComplete]);

  if (!defaultImages?.length) {
    return null;
  }

  return (
    <div ref={scopeRef}>
      <div className="preloader fixed top-0 z-[2000] bg-bckg">
        <div className="preloader-progress absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="progress-bar-x absolute h-px w-full bg-header" />
          <div className="progress-bar-y absolute w-px h-full bg-header" />
        </div>

        {/* Border box: exact same bounds as .preloader-images, scale 0 -> 1 */}
        <div className="preloader-border border border-header pointer-events-none" />

        <div className="preloader-images">
          {defaultImages.map((src, i) => (
            <div className="img" key={i}>
              <img src={src.img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
