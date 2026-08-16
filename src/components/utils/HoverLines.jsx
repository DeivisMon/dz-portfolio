export default function HoverLines({ translateXminus, translateXplus }) {
  return (
    <>
      <div
        className="
          absolute inset-0 flex h-full w-full justify-center
          [transform:skew(-13deg)_var(--translate)]
          transition-transform duration-800
          group-hover/button:[transform:skew(-13deg)_var(--hover-translate)]
        "
        style={{
          "--translate": `translateX(${translateXminus}%)`,
          "--hover-translate": `translateX(${translateXplus}%)`,
        }}
      >
        <div className="relative h-[80%] w-1 xl:w-4 bg-white/30 mix-blend-difference" />
      </div>

      <div
        className="
          absolute inset-0 flex h-full w-full justify-center
          [transform:skew(-13deg)_var(--translate)]
          transition-transform duration-800
          group-hover/button:[transform:skew(-13deg)_var(--hover-translate)]
        "
        style={{
          "--translate": `translateX(${translateXplus}%)`,
          "--hover-translate": `translateX(${translateXminus}%)`,
        }}
      >
        <div className="relative h-[80%] w-1 xl:w-4 bg-white/30 mix-blend-difference" />
      </div>
    </>
  );
}
