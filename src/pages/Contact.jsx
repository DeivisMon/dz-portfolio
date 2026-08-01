import { useResponsive } from "../hooks/useResponsive";
import PageSlideInTransitions from "../components/layout/PageSlideInTransitions";
import ContactComponent from "../components/InfoComonent";
import Footer from "../components/layout/Footer";
import WiperDesktop from "../components/layout/WiperDesktop";
import WiperMobile from "../components/layout/WiperMobile";

export default function Contact() {
  const { isTouchDevice } = useResponsive();

  return (
    <>
      <PageSlideInTransitions>
        <ContactComponent />
      </PageSlideInTransitions>

      {/* <Footer /> */}
      {!isTouchDevice ? <WiperDesktop /> : <WiperMobile />}
    </>
  );
}
