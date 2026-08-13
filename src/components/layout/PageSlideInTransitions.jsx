import { motion as Motion } from "framer-motion";
import { useResponsive } from "../../hooks/useResponsive";

export default function PageSlideInTransition({ children }) {
  const responsive = useResponsive();

  const containerVariants = {
    hidden: {
      y: responsive.isMobile || responsive.isTablet ? 25 : -25,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1.05,
        duration: 0.85,
        ease: [0.53, 0.2, 0.17, 1],
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
