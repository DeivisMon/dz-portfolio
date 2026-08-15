import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";

export default function AboutMeComponent() {
  const [on, setOn] = useState(false);
  const responsive = useResponsive();

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fadeUp = (d) => ({
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(20px)",
    transition: `opacity .85s cubic-bezier(0.22,1,0.36,1) ${d}s,
                 transform .85s cubic-bezier(0.22,1,0.36,1) ${d}s`,
  });

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-start text-text mt-54">
      {/* h1 */}
      <h1
        style={fadeUp(0.62)}
        className={`
          font-thin p-0 tracking-[0.3em] text-header text-[clamp(1.1rem,2vw,4rem)] ${responsive.isCompactHeight ? "mb-2" : "mb-3"} text-center
        `}
      >
        Apie Mane
      </h1>

      {/* bio */}
      <div
        style={fadeUp(0.9)}
        className={`px-2 xl:px-2 text-center text-muted
          ${responsive.isCompactHeight ? "leading-[1]" : "md:leading-[1.95]"} font-extralight
          text-[clamp(0.72rem,1vw,2.5rem)]
          flex flex-col gap-1 md:gap-2`}
      >
        <p>
          Sveiki, aš Darius — fotografas iš Klaipėdos, susitelkęs į atmosferą,
          žmogaus buvimą ir ramias akimirkas. Tyrinėjantis šviesą, tekstūrą ir
          judėjimą per vaizdinį pasakojimą.
        </p>
        <p>
          Prieš penkerius metus fotografija man buvo tik pomėgis — šiandien tai
          būdas sustabdyti akimirkas, kurios kitaip praeitų nepastebėtos.
          Kiekvienam kadrui taikau tą patį principą: pirmiausia jausmas, tik
          tada technika.
        </p>
        <p>
          Man svarbu ne poza, o žmogus už jos — todėl dažniausiai renkuosi
          natūralią šviesą, ramų tempą ir erdvę, kurioje jaustumėtės savimi.
          Rezultatas — nuotraukos, kurios primena ne kaip atrodėte, o kaip
          jautėtės.
        </p>
      </div>

      {responsive.isCompactHeight || responsive.isResponsive ? null : (
        <>
          {/* divider */}
          <span
            style={{
              ...fadeUp(1.1),
              width: on ? "100%" : "0%",
            }}
            className="mt-2 md:mt-4 h-px bg-border/50 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          />
          {/* stats */}
          <div
            style={fadeUp(1.3)}
            className="
          mt-2 md:mt-4 flex items-center justify-center
          gap-x-2 md:gap-x-6 gap-y-1 text-[clamp(0.72rem,1vw,2.5rem)]
          text-muted font-extralight tracking-wide text-center
        "
          >
            <span className="flex flex-col gap-x-1 items-center">
              <span>15+ </span>
              <span>metai patirties</span>
            </span>
            <span className="text-accent">·</span>
            <span className="flex flex-col gap-x-1 items-center">
              <span>100 000+</span>
              <span>nuotraukų</span>
            </span>
            <span className="text-accent">·</span>
            <span className="flex flex-col gap-x-1 items-center">
              <span>200+</span>
              <span>laimingų klientų</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
