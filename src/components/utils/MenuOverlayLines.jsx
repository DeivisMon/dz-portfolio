export default function MenuOverlayLines() {
  return (
    <div>
      <div class="fixed  inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(25%)] group-hover/menu:duration-800 group-hover/menu:[transform:skew(-13deg)_translateX(-57.5%)]">
        <div class="relative h-[100%] w-64 bg-white/1 mix-blend-difference"></div>
      </div>
      <div class="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-25%)] group-hover/menu:duration-800 group-hover/menu:[transform:skew(-13deg)_translateX(-57.5%)]">
        <div class="relative h-[100%] w-64 bg-white/1 mix-blend-difference"></div>
      </div>
      <div class="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-50%)] group-hover/menu:duration-800 group-hover/menu:[transform:skew(-13deg)_translateX(-57.5%)]">
        <div class="relative h-[100%] w-64 bg-white/1 mix-blend-difference"></div>
      </div>
      <div class="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(50%)] group-hover/menu:duration-800 group-hover/menu:[transform:skew(-13deg)_translateX(-57.5%)]">
        <div class="relative h-[100%] w-64 bg-white/1 mix-blend-difference"></div>
      </div>
      <div class="absolute  inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(0)] group-hover/menu:duration-800 group-hover/menu:[transform:skew(-13deg)_translateX(-57.5%)]">
        <div class="relative h-[100%] w-64 bg-white/1 mix-blend-difference"></div>
      </div>
    </div>
  );
}
