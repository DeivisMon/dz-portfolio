import { useState, useRef } from "react";
import { useResponsive } from "../hooks/useResponsive";
import AboutMeComponent from "./utils/AboutMeComponent";
import ContactSocials from "./utils/ContactSocials1";
import ContactChangeSideButton from "./utils/ContactChangeSideButton";
import Frame from "./utils/Frame";
import { IoTriangleSharp } from "react-icons/io5";

export default function InfoComponent() {
  // true = About Me visible (default), photo slides over Socials
  // false = Socials visible, photo slides over About Me
  const [showAbout, setShowAbout] = useState(true);
  const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const responsive = useResponsive();

  const handleMouseMove = (e) => {
    if (!buttonRef.current || responsive.isTouch) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 150;
    const maxMove = 75;

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      const moveX = distanceX * strength * (maxMove / maxDistance);
      const moveY = distanceY * strength * (maxMove / maxDistance);
      setButtonTransform({ x: moveX, y: moveY });
    } else {
      setButtonTransform({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setButtonTransform({ x: 0, y: 0 });
  };

  const isVerticalLayout =
    responsive.isMobilePortrait ||
    (responsive.isShortScreen &&
      !responsive.isMobileLandscape &&
      !responsive.isTabletLandscape);

  // Image's "home" position (translate 0,0) sits over the LEFT/TOP slot
  // (where About Me lives). To show About Me by default, the photo needs
  // to start slid over to the RIGHT/BOTTOM slot (over Socials) instead.
  const getImageTransform = () => {
    if (showAbout) {
      return isVerticalLayout ? "translateY(100%)" : "translateX(100%)";
    }
    return "translate(0, 0)";
  };

  const toggleView = () => {
    setShowAbout((prev) => !prev);
  };

  const isAbout = showAbout;

  return (
    <div
      className={`relative w-[100vw] h-[calc(100dvh)] xl:h-[calc(100dvh-18px)] xl:mt-[18px] overflow-hidden shadow-xl bg-bckg/70`}
    >
      <Frame />

      {/* Content Container - 50/50 split */}
      <div
        className={`absolute inset-0 flex ${isVerticalLayout ? "flex-col" : "flex-row"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* About Me Section (LEFT / TOP) */}
        <div
          className={`absolute ${isVerticalLayout ? "top-0 left-0 w-full h-1/2" : "left-0 top-0 w-1/2 h-full"} flex justify-center items-center px-8 z-10 sm:px-8 lg:px-24`}
        >
          <AboutMeComponent />
        </div>

        {/* Socials Section (RIGHT / BOTTOM) */}
        <div
          className={`absolute ${isVerticalLayout ? "bottom-0 left-0 w-full h-1/2" : "right-0 top-0 w-1/2 h-full"} flex justify-center px-2 z-10 px-0 sm:px-12 lg:px-18`}
        >
          <ContactSocials />
        </div>
      </div>

      {/* Sliding Image Overlay - Controlled by ContactChangeSideButton */}
      <div
        className={`cursor-trigger absolute transition-transform duration-500 ease-out z-10 ${isVerticalLayout ? "h-1/2 w-full" : "w-1/2 h-full"} bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}images/contact.jpg')`,
          transform: getImageTransform(),
          top: 0,
          left: 0,
        }}
        onClick={toggleView}
      >
        <span className="absolute -left-3 top-1/2 transform  -translate-y-1/2 rotate-90  z-12">
          <IoTriangleSharp size={40} />
        </span>
      </div>

      {/* ChangeSideButton — toggles the left pane between About Me and Socials */}
      <div
        className={`absolute z-30 ${
          isVerticalLayout
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        {/* <ContactChangeSideButton
          onClick={toggleView}
          buttonRef={buttonRef}
          buttonTransform={buttonTransform}
          currentText={
            isAbout ? (
              "Susisiek"
            ) : (
              <>
                Apie
                <br />
                Mane
              </>
            )
          }
          nextText={
            isAbout ? (
              <>
                Apie
                <br />
                Mane
              </>
            ) : (
              "Susisiek"
            )
          }
        /> */}
      </div>
    </div>
  );
}
