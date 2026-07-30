import AnimatedText from "../utils/AnimatedText";
import Socials from "../utils/Socials";
import { useLocation } from "react-router-dom";
import { LuArrowBigLeftDash, LuArrowBigRightDash } from "react-icons/lu";
import { CgArrowsExchange } from "react-icons/cg";
import { useResponsive } from "../../hooks/useResponsive";
import { motion as Motion } from "framer-motion";

export default function Footer() {
  const location = useLocation();
  const responsive = useResponsive();

  const Animate = (variants) => {
    return {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants,
    };
  };

  const slide = {
    initial: { y: "30px" },
    animate: {
      y: 0,
      transition: { duration: 1.5, delay: 1, ease: [0.53, 0.2, 0.17, 1] },
    },
    exit: {
      y: "30px",
      transition: { duration: 0.5, ease: [0.53, 0.2, 0.17, 1] },
    },
  };

  const getPath = () => (location.pathname === "/" ? "flex" : "hidden");

  return (
    <Motion.div
      {...Animate(slide)}
      className="footer fixed bottom-0 w-full z-[100] select-none bg-black/75 backdrop-blur-xl "
    >
      <footer className="flex items-end pl-4 justify-between">
        {responsive.isDesktop ? (
          <div className="text-muted whitespace-nowrap ">
            Žvinklys. &copy; {new Date().getFullYear()}
          </div>
        ) : null}
        <div
          className={`${getPath()} fixed text-muted w-full -bottom-5 left-1/2 transform -translate-y-1/2 -translate-x-1/2 justify-center text-lg xl:text-md animate-pulse`}
        >
          <div className="flex-1 flex justify-end">
            {responsive.isDesktop && <Socials />}
          </div>
          <CgArrowsExchange size={32} />
        </div>
        <Socials />
      </footer>
    </Motion.div>
  );
}
