import { useResponsive } from "../hooks/useResponsive";
import PageSlideInTransitions from "../components/layout/PageSlideInTransitions";
import WiperDesktop from "../components/layout/WiperDesktop";
import WiperMobile from "../components/layout/WiperMobile";
import PortfolioComponent from "../components/PortfolioComponent";

export default function Portfolio() {
  const { isTouchDevice } = useResponsive();

  return (
    <>
      <PageSlideInTransitions>
        <PortfolioComponent />
      </PageSlideInTransitions>

      {/* <Footer /> */}
      {!isTouchDevice ? <WiperDesktop /> : <WiperMobile />}
    </>
  );
}
