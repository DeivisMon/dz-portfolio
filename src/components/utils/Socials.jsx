import { motion as Motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const containerVariants = {
  hidden: { y: 65, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.5,
      staggerChildren: 0.15,
      delayChildren: 0.75,
    },
  },
  exit: { y: 15, opacity: 0, transition: { duration: 0.25 } },
};

const iconVariants = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function Socials() {
  const icons = [
    { id: "facebook", label: "Facebook" },
    { id: "instagram", label: "Instagram" },
  ];

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className="social-icons relative border-b border-muted/50 px-8 text-muted flex gap-4 pb-2 mix-blend-difference"
    >
      {icons.map(({ id, label }) => (
        <div
          key={id}
          className="cursor-trigger text-[16px] xl:text-[28px] group w-full px-6 flex justify-top items-center overflow-hidden"
          data-cursor-type="link"
        >
          <Motion.div
            variants={iconVariants}
            aria-label={label}
            className="border-b border-muted/0 group-hover:border-muted/50 transition-all duration-300 ease-in-out"
          >
            {label}
          </Motion.div>
          {/* <span className="opacity-0 rotate-360 translate-y-4 w-4 group-hover:translate-y-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-300 ease-in-out ">
            <MdArrowOutward size={32} />
          </span> */}
        </div>
      ))}
    </Motion.div>
  );
}
