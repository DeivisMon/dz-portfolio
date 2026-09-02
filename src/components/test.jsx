import { useState } from "react";
import {
  FiInstagram,
  FiMail,
  FiMapPin,
  FiCamera,
  FiAward,
} from "react-icons/fi";
import { PiFilmStrip } from "react-icons/pi";
import { TbBrandBehance } from "react-icons/tb";
import { useResponsive } from "../hooks/useResponsive";
import Frame from "./utils/Frame";

const STATS = [
  { value: "12", label: "Years shooting" },
  { value: "340+", label: "Projects" },
  { value: "28", label: "Awards" },
  { value: "60+", label: "Countries" },
];

const SPECIALTIES = [
  "Editorial & Fashion",
  "Architecture",
  "Documentary",
  "Fine Art Portraits",
];

export default function PhotographerAbout() {
  const responsive = useResponsive();

  return (
    <div
      className={`relative flex w-[100vw] ${responsive.isMobile || responsive.isTablet ? "h-[calc(100dvh-38px)] mt-[38px]" : "h-[calc(100dvh-148px)] xl:mt-[148px]"} overflow-hidden shadow-xl`}
      style={{
        // background: "#111110",
        // fontFamily: "'Inter', sans-serif",
        color: "#f0ede8",
      }}
    >
      <Frame />

      {/* ─── GOLDEN DIVIDER ─── */}
      <div
        className="gold-rule relative"
        style={{ width: "1px", flexShrink: 0 }}
      />

      {/* ─── MAIN CONTENT ─── */}
      <div className="flex flex-1 h-full overflow-hidden">
        {/* ─── CENTER: PORTRAIT ─── */}
        <div
          className="relative image-container"
          style={{ width: "50%", flexShrink: 0 }}
        >
          <div className="film-frame " />

          {/* Portrait */}
          <img
            src={`${import.meta.env.BASE_URL}images/About.jpg`}
            alt="Elena Voss — Photographer"
            className="w-full h-full object-cover grayscale hover:grayscale-70 transition-all duration-500"
            style={{ objectPosition: "center top" }}
          />

          {/* Bottom overlay text */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-10 pt-16"
            style={{
              background:
                "linear-gradient(to top, #111110 0%, rgba(17,17,16,0.7) 60%, transparent 100%)",
            }}
          >
            <p
              className="cormorant"
              style={{
                fontSize: "0.8rem",
                fontStyle: "italic",
                color: "#7a7570",
                letterSpacing: "0.05em",
                marginBottom: "0.25rem",
              }}
            >
              "Light is not just illumination — it is the story itself."
            </p>
          </div>
        </div>

        {/* ─── RIGHT: INFO PANEL ─── */}
        <div
          className="flex flex-col justify-between flex-1 px-10 py-8"
          style={{ overflowY: "hidden" }}
        >
          {/* MIDDLE: Name + Bio */}
          <div>
            <div className="flex items-end gap-4 mb-5">
              <div>
                <p
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                    borderBottom: "1px solid #c9a84c3f",
                  }}
                >
                  Apie Mane
                </p>
                <h1
                  className="darius"
                  style={{
                    fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)",
                    fontWeight: 600,
                    letterSpacing: "0.24em",
                    lineHeight: 1.05,
                    color: "#f0ede8",
                  }}
                >
                  Darius
                  <br />
                  <span style={{ color: "#7a7570", fontWeight: 400 }}>
                    Zvinklys
                  </span>
                </h1>
              </div>
              <div
                style={{
                  width: "3rem",
                  height: "1px",
                  background: "linear-gradient(to right, #c9a84c, transparent)",
                  marginBottom: "0.4rem",
                }}
              />
              <span
                className="cormorant"
                style={{
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "#4a4844",
                  marginBottom: "0.3rem",
                }}
              >
                //////
              </span>
            </div>
            <div className="space-y-4 text-[clamp(0.72rem,1vw,2.5rem)]">
              <p>
                Sveiki, aš Darius — fotografas iš Klaipėdos, susitelkęs į
                atmosferą, žmogaus buvimą ir ramias akimirkas. Tyrinėjantis
                šviesą, tekstūrą ir judėjimą per vaizdinį pasakojimą.
              </p>
              <p>
                Prieš penkerius metus fotografija man buvo tik pomėgis —
                šiandien tai būdas sustabdyti akimirkas, kurios kitaip praeitų
                nepastebėtos. Kiekvienam kadrui taikau tą patį principą:
                pirmiausia jausmas, tik tada technika.
              </p>
              <p>
                Man svarbu ne poza, o žmogus už jos — todėl dažniausiai renkuosi
                natūralią šviesą, ramų tempą ir erdvę, kurioje jaustumėtės
                savimi. Rezultatas — nuotraukos, kurios primena ne kaip
                atrodėte, o kaip jautėtės.
              </p>
            </div>

            <p
              style={{
                fontSize: "0.83rem",
                lineHeight: 1.75,
                color: "#4a4844",
                maxWidth: "420px",
                fontWeight: 300,
                marginTop: "0.75rem",
                filter: "mix-blend-mode: difference",
              }}
            >
              Formerly represented by Magnum Photos Europe. Published in{" "}
              <em
                className="cormorant"
                style={{ color: "#6a6560", fontStyle: "italic" }}
              >
                Vogue Italia, Le Monde, Zeit Magazin
              </em>
              , and exhibited at Galerie Camera Wien.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-4 gap-4" style={{ maxWidth: "420px" }}>
            {STATS.map((s) => (
              <div key={s.label} className="stat-card">
                <p
                  className="cinzel"
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#f0ede8",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "0.58rem",
                    color: "#4a4844",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "0.3rem",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* SPECIALTIES */}
          <div>
            <p
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                color: "#3a3835",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
              }}
            >
              Disciplines
            </p>
            <div className="flex flex-wrap gap-2">
              {SPECIALTIES.map((s) => (
                <span key={s} className="specialty-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
