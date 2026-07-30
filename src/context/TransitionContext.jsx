import { createContext, useContext } from "react";

export const TransitionContext = createContext({
  isTransitioning: false,
  setIsTransitioning: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);
