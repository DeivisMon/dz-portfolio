export default function HoverLines() {
  return (
    <>
      <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-70%)] group-hover/button:duration-800 group-hover/button:[transform:skew(-13deg)_translateX(70%)]">
        <div class="relative h-[80%] w-4 bg-white/50 mix-blend-difference"></div>
      </div>
      <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(70%)] group-hover/button:duration-800 group-hover/button:[transform:skew(-13deg)_translateX(-70%)]">
        <div class="relative h-[80%] w-4 bg-white/50 mix-blend-difference"></div>
      </div>
    </>
  );
}
