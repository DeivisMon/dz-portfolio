import { useState, useCallback, useEffect, useRef } from "react";

const AUTO_ADVANCE_MS = 10000;

const QUOTES = [
  { text: "Nuotrauką ne fotografuoji – ją sukuri.", author: "Ansel Adams" },
  {
    text: "Tavo pirmos 10 000 nuotraukų yra prasčiausios.",
    author: "Henri Cartier-Bresson",
  },
  {
    text: "Fotoaparatas – įrankis, mokantis žmones matyti.",
    author: "Dorothea Lange",
  },
  { text: "Nuotrauka yra paslaptis apie paslaptį.", author: "Diane Arbus" },
  {
    text: "Jei tavo nuotraukos nepakankamai geros, vadinasi, esi nepakankamai arti.",
    author: "Robert Capa",
  },
  {
    text: "Fotografija: nuotrauka, nutapyta saulės be instrukcijų mene..",
    author: "Ambrose Bierce",
  },
  { text: "Fotografija – tai stebėjimo menas.", author: "Elliott Erwitt" },
  {
    text: "Kuri mano nuotrauka mėgstamiausia? Ta, kurią nufotografuosiu rytoj.",
    author: "Imogen Cunningham",
  },
  {
    text: "Fotografuoju, kad sužinočiau, kaip kas nors atrodys nufotografuota.",
    author: "Garry Winogrand",
  },
  {
    text: "Portretas sukuriamas ne fotoaparate, o iš abiejų jo pusių.",
    author: "Edward Steichen",
  },
  {
    text: "Nuotrauka yra – arba turėtų būti – reikšmingas dokumentas, giliai persmelkiantis teiginys.",
    author: "Berenice Abbott",
  },
  {
    text: "Fotografija yra mano meditacija",
    author: "Czar Anthony Lopez",
  },
];

export default function PhotographerQuoteSlide() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(paused);

  const next = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
      setVisible(true);
    }, 350);
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    let raf;
    let elapsed = 0;
    let last = performance.now();
    setProgress(0);

    const loop = (now) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) elapsed += dt;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        next();
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [index, next]);

  const quote = QUOTES[index];
  const frameNo = String(index + 1).padStart(2, "0");
  const total = String(QUOTES.length).padStart(2, "0");

  return (
    <div className="w-full flex items-center justify-start mix-blend-difference">
      <div className="relative w-[clamp(200px,35vw,700px)] shrink-0">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden h-[144px] flex flex-col items-between justify-center"
        >
          <span
            aria-hidden="true"
            className="quote-font absolute top-1 left-2 text-[5rem] text-[#c9962f] opacity-[0.20] select-none"
          >
            &ldquo;
          </span>
          <span
            aria-hidden="true"
            className="quote-font absolute -bottom-13 right-2 text-[5rem] text-[#c9962f] opacity-[0.20] select-none"
          >
            &ldquo;
          </span>
          <div
            className={`
    relative flex-1 flex items-center justify-start ml-4
    transition-all duration-300 ease-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
  `}
          >
            <p
              className="
      quote-font italic text-muted px-2
      w-full
      text-[clamp(0.72rem,1vw,1.1rem)]
      leading-tight
      line-clamp-2
      xl:line-clamp-none
    "
            >
              {quote.text}
            </p>
          </div>

          <button
            onClick={next}
            aria-label="Show another quote now"
            className="absolute bottom-0 left-0 w-full focus:outline-none"
          >
            <span className="block h-[1px] w-full bg-muted/20 overflow-hidden">
              <span
                className="block h-full bg-muted"
                style={{ width: `${progress * 100}%` }}
              />
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-[#d8cfb8] uppercase -mt-5 px-1">
          <span className="shrink-0">
            {frameNo} / {total}
          </span>

          <div
            className={`
      relative flex items-center justify-end
      w-[70%] min-w-0
      transition-all duration-300 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
    `}
          >
            <div className="text-right w-full min-w-0">
              <div className="h-px w-full bg-[#3a342c]" />

              <span className="block truncate text-xs sm:text-sm tracking-[0.15em] uppercase text-[#d8cfb8]">
                &mdash; {quote.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
