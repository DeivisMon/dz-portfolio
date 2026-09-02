import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useSliderStore } from "../../store/sliderStore";
import { sliderData } from "../../data/sliderData";

gsap.registerPlugin(CustomEase);

const IMAGES_PER_CONTAINER = 8;
const IMAGE_SCALE = 1; // match IndexComponent's config.IMAGE_SCALE
const WIPE_DURATION = 0.75;
const WIPE_STAGGER = 0.25; // gap between each image reveal within a column
const COLUMN_OFFSET = 0.15; // slight stagger so columns don't all wipe in lockstep

export default function Loader({ onComplete }) {
  const scopeRef = useRef(null);
  const selectedImages = useSliderStore((s) => s.selectedImages);

  // Column i shows sliderData chunk [i*8 .. i*8+7], last frame forced to the
  // real selected image so it matches Index on handoff.
  const sequences = useMemo(() => {
    if (!selectedImages) return null;

    return Array.from({ length: 4 }, (_, colIndex) => {
      const start = colIndex * IMAGES_PER_CONTAINER;
      const chunk = Array.from(
        { length: IMAGES_PER_CONTAINER },
        (_, i) => sliderData[(start + i) % sliderData.length],
      );
      chunk[chunk.length - 1] = selectedImages[colIndex];
      return chunk;
    });
  }, [selectedImages]);

  useEffect(() => {
    if (!sequences) return;

    const ctx = gsap.context(() => {
      CustomEase.create("hop", "0.9, 0, 0.1, 1");

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".preloader", {
        opacity: 1,
        y: 0,
        scale: 0.7,
        duration: 0.6,
        ease: "power2.inOut",
      });

      const columns = gsap.utils.toArray(".preloader-column");
      let maxColumnEnd = 0;

      columns.forEach((column, colIndex) => {
        const imgs = column.querySelectorAll(".img");
        const inners = column.querySelectorAll(".img img");
        const columnStart = colIndex * COLUMN_OFFSET;

        imgs.forEach((img, i) => {
          const at = columnStart + i * WIPE_STAGGER;
          tl.to(
            img,
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: WIPE_DURATION,
              ease: "hop",
            },
            at,
          );
          maxColumnEnd = Math.max(maxColumnEnd, at + WIPE_DURATION);
        });

        inners.forEach((img, i) => {
          tl.to(
            img,
            { scale: 1, duration: WIPE_DURATION + 0.5, ease: "hop" },
            columnStart + i * WIPE_STAGGER,
          );
        });
      });

      // Once every column has revealed its final (selected) image,
      // scale all 4 up to match how Index displays them
      tl.to(
        ".preloader-column img",
        { scale: IMAGE_SCALE, duration: 0.6, ease: "power2.out" },
        maxColumnEnd + 0.1,
      );

      tl.to(".preloader", {
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Curtain fades, then hand off
      tl.to(".preloader", {
        opacity: 1,
        // y: "-150vh",
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => onComplete?.(),
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [sequences, onComplete]);

  if (!sequences) return null;

  return (
    <div ref={scopeRef}>
      <div className="preloader fixed inset-0 z-[2000] flex">
        {sequences.map((seq, colIndex) => (
          <div
            className="preloader-column relative h-[calc(100dvh)] xl:h-[calc(100dvh-148px)] xl:mt-[148px]  flex-1 overflow-hidden"
            key={colIndex}
          >
            {seq.map((imgData, i) => (
              <div
                className="img h-full w-full absolute inset-0 mx-[0.125vw] overflow-hidden"
                style={{
                  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                }}
                key={i}
              >
                <img
                  src={imgData.img}
                  alt={imgData.id?.toString()}
                  className="h-full w-full object-cover"
                  style={{ transform: "scale(2.05)" }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
