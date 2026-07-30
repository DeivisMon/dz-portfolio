import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

export default function PageSlideInTransition({ children }) {
  const responsive = useResponsive();

  const containerVariants = {
    hidden: { y: -25, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: responsive.isMobile || responsive.isTablet ? 1.25 : 0.9,
        duration: 0.85,
        ease: [0.53, 0.2, 0.17, 1],
      },
    },
    exit: {
      y: "30%",
      opacity: 1,
      transition: {
        delay: responsive.isMobile || responsive.isTablet ? 0.75 : 0.75,
        duration: responsive.isMobile || responsive.isTablet ? 0.25 : 1.25,
      },
    },
  };

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {children}
    </Motion.div>
  );
}
