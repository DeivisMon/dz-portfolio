import { Link, useNavigate } from "react-router-dom";
import { useResponsive } from "../hooks/useResponsive";
import Frame from "./utils/Frame";

const STATS = [
  { value: "15+", label: "metai patirties" },
  { value: "10 000+", label: "nuotraukų" },
  { value: "200+", label: "laimingų klientų" },
];

const LOCATION = ["Lietuva,", "Klaipėda"];

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function PhotographerAbout() {
  const responsive = useResponsive();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  return (
    <div
      className={`relative flex w-[100vw] ${responsive.isMobile || responsive.isTablet ? "h-[calc(100dvh-64px)] mt-[64px]" : "h-[calc(100dvh-148px)] xl:mt-[148px]"} overflow-hidden`}
    >
      <Frame />
      {/* <div
        className="gold-rule relative"
        style={{ width: "1px", flexShrink: 0 }}
      /> */}

      {/* ─── MAIN CONTENT ─── */}
      <div
        className={`flex ${responsive.isMobile && !responsive.isCompactHeight ? "flex-col" : "flex-row"} w-full h-full overflow-hidden`}
      >
        {/* ─── CENTER: PORTRAIT ─── */}
        <div className="flex-1 relative image-container">
          <div className="film-frame " />

          {/* Portrait */}
          <img
            src={`${import.meta.env.BASE_URL}images/About.jpg`}
            alt="Photographer Darius Žvinklys"
            className="w-full h-full object-cover grayscale hover:grayscale-50 transition-all duration-500"
            style={{ objectPosition: "center top" }}
          />
        </div>

        {/* ─── RIGHT: INFO PANEL ─── */}
        <div className="flex flex-col justify-between flex-1 px-10 py-8 scrollable-container overflow-x-hidden">
          {/* MIDDLE: Name + Bio */}
          <div>
            <div className="flex items-end gap-4 mb-5">
              <div>
                <p
                  style={{
                    fontSize: "0.75rem",
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
                  className="darius text-text"
                  style={{
                    fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)",
                    fontWeight: 600,
                    letterSpacing: "0.24em",
                    lineHeight: 1.05,
                  }}
                >
                  Darius
                  <br />
                  <span
                    style={{
                      color: "#7a7570",
                      fontWeight: 400,
                      letterSpacing: "0.45em",
                      textTransform: "uppercase",
                    }}
                  >
                    Žvinklys
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
                  color: "#4a4544",
                  marginBottom: "0.3rem",
                }}
              >
                {/* ///////////////////////////// */}
              </span>
            </div>
            <div className="space-y-4 text-[clamp(0.72rem,1vw,2.5rem)] text-text">
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

            <div className="w-full flex justify-start gap-1 mt-8 cursor-no-distort">
              <Link
                to="/portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("/portfolio");
                }}
                style={{ border: "1px solid var(--color-border)" }}
                className="bg-surface/50 text-accent font-bold flex items-center justify-center py-2 px-4 hover:text-muted transition duration-300 ease-in-out"
              >
                <span className="mr-2"> Galerija </span> <ArrowIcon />
              </Link>

              <Link
                to="/kontaktai"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("/kontaktai");
                }}
                className="bg-muted/50 text-bckg font-bold flex items-center justify-center py-2 px-4 hover:text-accent transition duration-300 ease-in-out"
              >
                <span className="mr-2"> Susisiekime </span> <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div
            className="mt-2 md:mt-4 flex items-center justify-start
          gap-x-2 md:gap-x-6 gap-y-1 text-[clamp(0.72rem,1vw,2.5rem)]
          text-muted font-extralight tracking-wide text-center"
            style={{ maxWidth: "720px" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start justify-center"
              >
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    // color: "#f0ede8",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "0.675rem",
                    // color: "#4a4844",
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

          {/* LOCATION */}
          <div>
            <p
              className="flex border-b border-white/10 w-fit mb-1"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                color: "#aaa7a4",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              Lokacija
            </p>
            <div className="flex gap-2 text-muted">
              {LOCATION.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
