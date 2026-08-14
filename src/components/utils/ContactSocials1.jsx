import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

const containerVariants = {
  hidden: { y: 65, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.25,
      duration: 0.5,
      staggerChildren: 0.15,
      delayChildren: 1.5,
    },
  },
  exit: {
    y: -15,
    opacity: 0,
    transition: { duration: 0.25 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const rows = [
  {
    id: "email",
    labelKey: "El.paštas",
    value: "zvinklys@zvinklys.com",
    data: "copy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3,5 12,13 21,5" />
      </svg>
    ),
    copyable: true,
    href: "mailto:zvinklys@zvinklys.com",
  },
  {
    id: "phone",
    labelKey: "Telefonas",
    value: "+370 624 84565",
    data: "link",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    href: "tel:+37062484565",
  },
  {
    id: "facebook",
    labelKey: "Facebook",
    value: "facebook.com/zvinklys",
    data: "link",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    href: "https://facebook.com/darius.zvinklys.5",
    external: true,
  },
  {
    id: "instagram",
    labelKey: "Instagram",
    value: "@zvinklys",
    data: "link",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: "",
    external: true,
  },
];

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

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function ContactSocials() {
  const [copied, setCopied] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const responsive = useResponsive();
  const isCompact = responsive.isMobile || responsive.isTablet;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText("zvinklys@zvinklys.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const containerWidth = isCompact ? "w-6/7" : "w-3/4";
  const headingMargin = isCompact ? "mb-2" : "mb-6";
  const headingSize = isCompact
    ? "text-[clamp(1.1rem,2vw,2rem)]"
    : "text-[clamp(1.1rem,2vw,4rem)]";
  const headingBottomMargin = isCompact ? "mb-2" : "mb-4";

  const rowsLayout = isCompact ? "flex-row gap-4" : "flex-col gap-1";

  const rowBorder = isCompact ? "" : "border-t border-border/50";

  const linkLayout = isCompact
    ? "flex-col items-center gap-0 px-0 py-0"
    : "flex-row items-center gap-4 px-4 py-6";

  const labelSize = isCompact
    ? "text-[clamp(0.5rem,0.8vw,1rem)]"
    : "text-[clamp(0.6rem,1vw,2.5rem)]";

  const labelTracking = isCompact ? "tracking-[1px]" : "tracking-[0.2em]";

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`
        flex flex-col items-center justify-center
        ${containerWidth}
        h-full
      `}
    >
      {/* Heading */}
      <Motion.div variants={itemVariants} className={headingMargin}>
        <h2
          className={`
            font-thin tracking-[0.3em]
            text-header
            ${headingSize}
            ${headingBottomMargin}
            text-center
          `}
        >
          Susisiekime
        </h2>
      </Motion.div>

      {/* Rows */}
      <div
        className={`
          flex justify-center
          ${rowsLayout}
          w-full
        `}
      >
        {rows.map((row) => {
          const isHovered = hoveredRow === row.id;
          const isCopied = copied && row.id === "email";

          return (
            <Motion.div
              key={row.id}
              variants={itemVariants}
              className={`
                flex cursor-trigger group relative
                ${rowBorder}
              `}
              data-cursor-type={row.data}
              onMouseEnter={() => setHoveredRow(row.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={row.copyable ? copy : undefined}
            >
              <a
                href={row.copyable ? undefined : row.href}
                target={row.external ? "_blank" : undefined}
                rel={row.external ? "noopener noreferrer" : undefined}
                className={`
                  flex w-full justify-center
                  ${linkLayout}
                  group-hover:translate-y-[2px]
                  group-hover:translate-x-[-16px]
                  transition-all duration-400
                  no-underline
                `}
                onClick={
                  row.copyable
                    ? (e) => {
                        e.preventDefault();
                        copy();
                      }
                    : undefined
                }
              >
                {/* Icon */}
                <div
                  className="
                    flex-shrink-0
                    w-10 h-10
                    rounded-full
                    my-4
                    flex items-center justify-center
                    group-hover:bg-muted/20
                    group-hover:scale-115
                    transition-all duration-400
                  "
                  style={{
                    border: "0.5px solid",
                    borderColor: isHovered
                      ? "rgba(166,124,82,0.5)"
                      : "rgba(255,255,255,0.2)",
                    color: isHovered ? "#A67C52" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {row.icon}
                </div>

                {/* Label + Value */}
                <div className="flex flex-col flex-1 min-w-0">
                  <span
                    className={`
                      ${labelSize}
                      tracking-[2px]
                      ${labelTracking}
                      uppercase
                      font-thin
                      transition-colors duration-200
                    `}
                    style={{
                      color: isHovered
                        ? "rgba(166,124,82,0.8)"
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {row.labelKey}
                  </span>

                  {/* Value only on desktop */}
                  {!isCompact && (
                    <span
                      className="
                        inline-block
                        text-[clamp(0.72rem,1vw,2.5rem)]
                        lg:text-base
                        tracking-[0.05em]
                        font-thin
                        truncate
                        transition-colors duration-200
                      "
                      style={{
                        color: isHovered
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {row.value}
                    </span>
                  )}
                </div>

                {/* Right action icon — desktop only */}
                {!isCompact && (
                  <div
                    className="
                      flex-shrink-0
                      transition-all duration-400
                    "
                    style={{
                      color: isHovered ? "#A67C52" : "rgba(255,255,255,0.2)",
                      transform: isHovered
                        ? "translate(2px, -2px)"
                        : "translate(0,0)",
                    }}
                  >
                    {row.copyable ? (
                      isCopied ? (
                        <CheckIcon />
                      ) : (
                        <CopyIcon />
                      )
                    ) : (
                      <ArrowIcon />
                    )}
                  </div>
                )}
              </a>

              {/* Bottom divider */}
              {!isCompact && (
                <div
                  className="
                    absolute bottom-0 left-3 right-3 h-px
                    transition-opacity duration-200
                  "
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(166,124,82,0.3), transparent)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              )}
            </Motion.div>
          );
        })}
      </div>
    </Motion.div>
  );
}
