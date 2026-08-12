import { useResponsive } from "../hooks/useResponsive";
import PageSlideInTransitions from "../components/layout/PageSlideInTransitions";
import Footer from "../components/layout/Footer";
import WiperDesktop from "../components/layout/WiperDesktop";
import WiperMobile from "../components/layout/WiperMobile";
import IndexComponent from "../components/IndexComponent";

export default function Index() {
  const { isTouchDevice } = useResponsive();

  return (
    <>
      <PageSlideInTransitions>
        <IndexComponent />
      </PageSlideInTransitions>

      {/* <Footer /> */}
      {!isTouchDevice ? <WiperDesktop /> : <WiperDesktop />}
      {/* {!isTouchDevice ? <Wiper /> : ""} */}
    </>
  );
}
