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
      className={`relative flex w-[100vw] ${responsive.isMobile || responsive.isTablet ? "h-[calc(100dvh-38px)] mt-[38px]" : "h-[calc(100dvh-64px)] mt-[64px]"} overflow-hidden shadow-xl bg-bckg`}
      style={{
        // background: "#111110",
        // fontFamily: "'Inter', sans-serif",
        color: "#f0ede8",
      }}
    >
      <Frame />
      {/* Google Fonts */}
      <style>{`
        
      `}</style>

      {/* ─── LEFT SIDEBAR ─── */}
      <aside
        className="flex flex-col justify-between py-8 px-5 relative"
        style={{ width: "72px", minWidth: "72px", background: "#0d0d0c" }}
      >
        {/* Filmstrip holes */}
        <div className="flex flex-col items-center pt-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`filmstrip-dot ${[2, 5, 9, 13, 16].includes(i) ? "lit" : ""}`}
            />
          ))}
        </div>

        {/* Vertical name */}
        {/* <div
          className="cinzel absolute"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg) translateX(50%)",
            left: "50%",
            top: "50%",
            marginTop: "-80px",
            fontSize: "0.62rem",
            letterSpacing: "0.3em",
            color: "#4a4844",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          © 2026 Darius Zvinklys
        </div> */}

        <div className="flex flex-col items-center pb-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className={`filmstrip-dot ${[1, 4, 8, 12, 15].includes(i) ? "lit" : ""}`}
            />
          ))}
        </div>
      </aside>

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
          style={{ width: "42%", flexShrink: 0 }}
        >
          <div className="film-frame " />

          {/* Portrait */}
          <img
            src={`${import.meta.env.BASE_URL}images/About.jpg`}
            alt="Elena Voss — Photographer"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            style={{ objectPosition: "center top" }}
          />

          {/* Bottom overlay text */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-8 pt-16"
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
            <div
              style={{
                width: "2rem",
                height: "1px",
                background: "#c9a84c",
                opacity: 0.6,
              }}
            />
          </div>

          {/* Location badge */}
          {/* <div
            className="absolute top-6 right-6 z-20 flex items-center gap-1.5"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "#7a7570",
              textTransform: "uppercase",
            }}
          >
            <FiMapPin size={9} style={{ color: "#c9a84c" }} />
            Klaipeda, LT
          </div> */}
        </div>

        {/* ─── RIGHT: INFO PANEL ─── */}
        <div
          className="flex flex-col justify-between flex-1 px-10 py-8"
          style={{ background: "#111110", overflowY: "hidden" }}
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
                  }}
                >
                  About the Artist
                </p>
                <h1
                  className="cinzel"
                  style={{
                    fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
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
              {/* <span
                className="cormorant"
                style={{
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  color: "#4a4844",
                  marginBottom: "0.3rem",
                }}
              >
                Visual Storyteller
              </span> */}
            </div>

            <p
              style={{
                fontSize: "0.83rem",
                lineHeight: 1.75,
                color: "#7a7570",
                maxWidth: "420px",
                fontWeight: 300,
              }}
            >
              Based in Berlin, I work at the intersection of light and
              narrative. My practice spans editorial commissions for
              international publications, long-form documentary work, and
              gallery-exhibited fine art — always driven by the belief that the
              decisive moment reveals itself in stillness, not speed.
            </p>

            <p
              style={{
                fontSize: "0.83rem",
                lineHeight: 1.75,
                color: "#4a4844",
                maxWidth: "420px",
                fontWeight: 300,
                marginTop: "0.75rem",
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

          {/* BOTTOM: CTA + Socials */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="cta-btn">
                <span>View Portfolio</span>
              </button>
              <button
                className="cta-btn"
                style={{ borderColor: "#2e2c28", color: "#4a4844" }}
              >
                <span style={{ color: "inherit" }}>Get in Touch</span>
              </button>
            </div>
            {/* 
            <div className="flex items-center gap-2">
              <div className="social-btn">
                <FiInstagram size={13} />
              </div>
              <div className="social-btn">
                <TbBrandBehance size={13} />
              </div>
              <div className="social-btn">
                <FiMail size={13} />
              </div>
              <div
                style={{
                  width: "1px",
                  height: "24px",
                  background: "#2e2c28",
                  margin: "0 4px",
                }}
              />
              <div className="flex items-center gap-1.5">
                <FiCamera size={10} style={{ color: "#c9a84c" }} />
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "#3a3835",
                    letterSpacing: "0.1em",
                  }}
                >
                  Available for hire
                </span>
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#4caf50",
                    display: "inline-block",
                    boxShadow: "0 0 6px #4caf5088",
                  }}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
