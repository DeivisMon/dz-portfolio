import { useState, useEffect, useRef } from "react";
import { useDeviceType } from "../hooks/useDeviceType";
import { sliderData } from "../data/sliderData";
import Frame from "./utils/Frame";

export default function IndexComponent() {
  const sliderRef = useRef(null);
  const { isVerticalMobile, isHorizontalMobile } = useDeviceType();

  const [randomImages] = useState(() => {
    const shuffled = [...sliderData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
  });

  useEffect(() => {
    const config = {
      SCROLL_SPEED: 1.75,
      LERP_FACTOR: 0.05,
      MAX_VELOCITY: 150,
      SNAP_THRESHOLD: 0.5,
      SNAP_DELAY: 100,
      IMAGE_SCALE: 1.25,
      PARALLAX_MULTIPLIER: -0.085,
      AUTO_SCROLL_SPEED: 0.6,
      AUTO_SCROLL_DELAY: 2000,
      USER_IDLE_DELAY: 800,
      get VISIBILITY_BUFFER() {
        return Math.max(
          (window.innerWidth / 2 + 255) *
            Math.abs(this.PARALLAX_MULTIPLIER) *
            1.5,
          200,
        );
      },
    };

    const totalSlideCount = randomImages.length;

    const state = {
      currentX: 0,
      targetX: 0,
      slideWidth: 0,
      slides: [],
      isDragging: false,
      startX: 0,
      lastX: 0,
      lastMouseX: 0,
      lastScrollTime: Date.now(),
      isMoving: false,
      velocity: 0,
      lastCurrentX: 0,
      dragDistance: 0,
      hasActuallyDragged: false,
      snapTimeout: null,

      // Auto-scroll state
      autoScrollActive: false,
      autoScrollDirection: -1, // -1 = left, +1 = right
      autoScrollStartTimer: null,
      userIdleTimer: null,
      userIsInteracting: false,
      lastUserDeltaX: 0, // tracks which direction user last moved
    };

    // ── Auto-scroll helpers ──────────────────────────────────────────────────

    function startAutoScroll() {
      state.autoScrollActive = true;
    }

    function stopAutoScroll() {
      state.autoScrollActive = false;
    }

    function scheduleAutoScrollResume() {
      if (state.userIdleTimer) clearTimeout(state.userIdleTimer);
      state.userIdleTimer = setTimeout(() => {
        state.userIsInteracting = false;
        startAutoScroll();
      }, config.USER_IDLE_DELAY);
    }

    function onUserInteractionStart(deltaX) {
      state.userIsInteracting = true;
      if (deltaX !== undefined) state.lastUserDeltaX = deltaX;
      stopAutoScroll();
      if (state.userIdleTimer) clearTimeout(state.userIdleTimer);
    }

    function onUserInteractionEnd() {
      // Determine direction from last user movement
      if (state.lastUserDeltaX < 0) {
        state.autoScrollDirection = -1; // user scrolled/dragged left → continue left
      } else if (state.lastUserDeltaX > 0) {
        state.autoScrollDirection = 1; // user scrolled/dragged right → continue right
      }
      scheduleAutoScrollResume();
    }

    // ── Slide creation ───────────────────────────────────────────────────────

    function createSlideElement(index) {
      const slide = document.createElement("div");
      slide.className = "slide";

      if (isVerticalMobile) {
        slide.style.width = "99vw";
        slide.style.height = "100dvh";
      } else if (isHorizontalMobile) {
        slide.style.width = "180px";
        slide.style.height = "84dvh";
      }

      const imageContainer = document.createElement("div");
      imageContainer.className = "slide-image";

      const img = document.createElement("img");
      const dataIndex = index % totalSlideCount;
      img.src = randomImages[dataIndex].img;
      img.alt = randomImages[dataIndex].id.toString();

      const overlay = document.createElement("div");
      overlay.className = "slide-overlay";

      imageContainer.appendChild(img);
      slide.appendChild(imageContainer);
      slide.appendChild(overlay);

      return slide;
    }

    function getSlideFullWidth(slide) {
      const rect = slide.getBoundingClientRect();
      const styles = window.getComputedStyle(slide);
      const marginLeft = parseFloat(styles.marginLeft);
      const marginRight = parseFloat(styles.marginRight);
      return rect.width + marginLeft + marginRight;
    }

    function initializeSlides() {
      const track = sliderRef.current?.querySelector(".slide-track");
      if (!track) return;

      track.innerHTML = "";
      state.slides = [];

      const copies = 8;
      const totalSlides = totalSlideCount * copies;

      for (let i = 0; i < totalSlides; i++) {
        const slide = createSlideElement(i);
        track.appendChild(slide);
        state.slides.push(slide);
      }

      const firstSlide = track.querySelector(".slide");

      if (isVerticalMobile) {
        state.slideWidth = window.innerWidth;
      } else if (isHorizontalMobile) {
        state.slideWidth = 185;
      } else {
        state.slideWidth = getSlideFullWidth(firstSlide);
      }

      const startOffset = -(totalSlideCount * state.slideWidth * 2);
      state.currentX = startOffset;
      state.targetX = startOffset;
    }

    function updateSlidePositions() {
      const track = sliderRef.current?.querySelector(".slide-track");
      if (!track) return;

      const sequenceWidth = state.slideWidth * totalSlideCount;

      if (state.currentX > -sequenceWidth * 1) {
        state.currentX -= sequenceWidth;
        state.targetX -= sequenceWidth;
      } else if (state.currentX < -sequenceWidth * 4) {
        state.currentX += sequenceWidth;
        state.targetX += sequenceWidth;
      }

      track.style.transform = `translate3d(${state.currentX}px, 0, 0)`;
    }

    function updateParallax() {
      const viewportCenter = window.innerWidth / 2;

      state.slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (!img) return;

        const slideRect = slide.getBoundingClientRect();

        if (
          slideRect.right < -config.VISIBILITY_BUFFER ||
          slideRect.left > window.innerWidth + config.VISIBILITY_BUFFER
        ) {
          return;
        }

        const slideCenter = slideRect.left + slideRect.width / 2;
        const distanceFromCenter = slideCenter - viewportCenter;
        const parallaxOffset = distanceFromCenter * config.PARALLAX_MULTIPLIER;

        img.style.transform = `translateX(${parallaxOffset}px) scale(${config.IMAGE_SCALE})`;
      });
    }

    function snapToNearestSlide() {
      if (!isVerticalMobile || !state.slideWidth) return;

      const viewportCenter = window.innerWidth / 2;
      const slideCenter = state.slideWidth / 2;
      const centerOffset = viewportCenter - slideCenter;
      const currentOffset = state.currentX + centerOffset;
      const nearestSlideIndex = Math.round(currentOffset / state.slideWidth);
      const newTarget = nearestSlideIndex * state.slideWidth - centerOffset;

      state.targetX = newTarget;
    }

    function checkAndInitiateSnap() {
      if (!isVerticalMobile || state.isDragging) {
        if (state.snapTimeout) {
          clearTimeout(state.snapTimeout);
          state.snapTimeout = null;
        }
        return;
      }

      if (state.snapTimeout) clearTimeout(state.snapTimeout);

      state.snapTimeout = setTimeout(() => {
        const timeSinceScroll = Date.now() - state.lastScrollTime;
        const isStill = state.velocity < config.SNAP_THRESHOLD;

        if (timeSinceScroll > 50 && isStill && !state.isDragging) {
          snapToNearestSlide();
        }
      }, config.SNAP_DELAY);
    }

    function updateMovingState() {
      state.velocity = Math.abs(state.currentX - state.lastCurrentX);
      state.lastCurrentX = state.currentX;

      const isSlowEnough = state.velocity < 0.1;
      const hasBeenStillLongEnough = Date.now() - state.lastScrollTime > 200;

      const wasMoving = state.isMoving;
      state.isMoving =
        state.hasActuallyDragged || !isSlowEnough || !hasBeenStillLongEnough;

      if (
        wasMoving &&
        !state.isMoving &&
        !state.isDragging &&
        isVerticalMobile
      ) {
        checkAndInitiateSnap();
      }
    }

    function animate() {
      // Apply auto-scroll by nudging targetX each frame
      if (state.autoScrollActive && !state.userIsInteracting) {
        state.targetX += state.autoScrollDirection * config.AUTO_SCROLL_SPEED;
      }

      state.currentX += (state.targetX - state.currentX) * config.LERP_FACTOR;

      updateMovingState();
      updateSlidePositions();
      updateParallax();

      requestAnimationFrame(animate);
    }

    // ── Event handlers ───────────────────────────────────────────────────────

    function handleWheel(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      state.lastScrollTime = Date.now();
      state.lastUserDeltaX = -e.deltaY; // negative deltaY = scroll down = move left

      onUserInteractionStart(-e.deltaY);

      const scrollDelta = e.deltaY * config.SCROLL_SPEED;
      state.targetX -= Math.max(
        Math.min(scrollDelta, config.MAX_VELOCITY),
        -config.MAX_VELOCITY,
      );

      onUserInteractionEnd();
    }

    function handleTouchStart(e) {
      state.isDragging = true;
      state.startX = e.touches[0].clientX;
      state.lastX = state.targetX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();

      if (state.snapTimeout) {
        clearTimeout(state.snapTimeout);
        state.snapTimeout = null;
      }
    }

    function handleTouchMove(e) {
      if (!state.isDragging) return;

      const deltaX = (e.touches[0].clientX - state.startX) * 1.5;
      state.targetX = state.lastX + deltaX;
      state.dragDistance = Math.abs(deltaX);

      if (state.dragDistance > 5) state.hasActuallyDragged = true;

      state.lastScrollTime = Date.now();
    }

    function handleTouchEnd() {
      state.isDragging = false;
      state.lastScrollTime = Date.now();
      setTimeout(() => {
        state.hasActuallyDragged = false;
      }, 100);
    }

    function handleMouseDown(e) {
      if (isVerticalMobile || isHorizontalMobile) return;
      e.preventDefault();
      state.isDragging = true;
      state.startX = e.clientX;
      state.lastMouseX = e.clientX;
      state.lastX = state.targetX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();

      onUserInteractionStart();

      if (state.snapTimeout) {
        clearTimeout(state.snapTimeout);
        state.snapTimeout = null;
      }
    }

    function handleMouseMove(e) {
      if (isVerticalMobile || isHorizontalMobile) return;
      if (!state.isDragging) return;

      e.preventDefault();
      const deltaX = (e.clientX - state.lastMouseX) * 2;
      state.targetX += deltaX;
      state.lastMouseX = e.clientX;
      state.dragDistance += Math.abs(deltaX);
      state.lastUserDeltaX = deltaX;

      if (state.dragDistance > 5) state.hasActuallyDragged = true;

      state.lastScrollTime = Date.now();
    }

    function handleMouseUp() {
      if (isVerticalMobile || isHorizontalMobile) return;
      if (!state.isDragging) return;
      state.isDragging = false;
      state.lastScrollTime = Date.now();
      setTimeout(() => {
        state.hasActuallyDragged = false;
      }, 100);
      onUserInteractionEnd();
    }

    function handleResize() {
      initializeSlides();
    }

    function initializeEventListeners() {
      const slider = sliderRef.current;
      if (!slider) return;

      slider.addEventListener("wheel", handleWheel, { passive: false });
      slider.addEventListener("touchstart", handleTouchStart);
      slider.addEventListener("touchmove", handleTouchMove);
      slider.addEventListener("touchend", handleTouchEnd);
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseUp);
      slider.addEventListener("dragstart", (e) => e.preventDefault());

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("resize", handleResize);

      return () => {
        slider.removeEventListener("wheel", handleWheel);
        slider.removeEventListener("touchstart", handleTouchStart);
        slider.removeEventListener("touchmove", handleTouchMove);
        slider.removeEventListener("touchend", handleTouchEnd);
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseUp);
        slider.removeEventListener("dragstart", (e) => e.preventDefault());

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("resize", handleResize);

        if (state.autoScrollStartTimer)
          clearTimeout(state.autoScrollStartTimer);
        if (state.userIdleTimer) clearTimeout(state.userIdleTimer);
        if (state.snapTimeout) clearTimeout(state.snapTimeout);
      };
    }

    function initializeSlider() {
      initializeSlides();
      const cleanup = initializeEventListeners();

      // Start auto-scroll after delay — desktop only
      if (!isVerticalMobile && !isHorizontalMobile) {
        state.autoScrollStartTimer = setTimeout(() => {
          state.autoScrollDirection = -1; // initial direction: left
          startAutoScroll();
        }, config.AUTO_SCROLL_DELAY);
      }

      animate();
      return cleanup;
    }

    const cleanup = initializeSlider();
    return cleanup;
  }, [isVerticalMobile, isHorizontalMobile, randomImages]);

  return (
    <div className="slider bg-bckg/70" ref={sliderRef}>
      <Frame />
      <div className="slide-track"></div>
    </div>
  );
}
