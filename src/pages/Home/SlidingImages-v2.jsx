import { motion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const slides = [
  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385723/watfootball_t0n1ij.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385719/grupa_kg2hzg.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385716/crypto_concept_jiijp7.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385740/web_concept_rvw36w.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385717/ratham_b8momb.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385711/investment_app_setg8p.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385711/ui_fragment_tu4z6q.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385718/unque_cezqhe.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385720/ratham-1_kierzt.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385713/crypto_app_oaslwa.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385713/grupa-1_kz9lne.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385713/ui_payment_z4cv9h.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385711/bv_b175dd.png",

  "https://res.cloudinary.com/chibuzor-okeke-portfolio/image/upload/q_auto/f_auto/v1777385726/webpage_axyeus.png",
];

const Slider = styled(motion.section)`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  padding-block: 1.6rem;

  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Img = styled.img`
  height: 47rem;
  width: auto;
  flex: 0 0 auto;
  border-radius: 2.4rem;
  /* box-shadow: 0 0 30px rgba(var(--color-text-800-rgb), 0.05); */
  filter: drop-shadow(0 0 20px rgba(var(--color-text-800-rgb), 0.05));

  @media screen and (max-width: 657px) {
    height: 30rem;
  }
`;

function SlidingImages({ speed = 100 }) {
  const sliderRef = useRef(null);
  const isPausedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  const loopedSlides = useMemo(() => [...slides, ...slides], []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function setPauseFromVisibility() {
      isPausedRef.current = document.hidden || prefersReducedMotion.matches;
    }

    setPauseFromVisibility();
    document.addEventListener("visibilitychange", setPauseFromVisibility);
    prefersReducedMotion.addEventListener("change", setPauseFromVisibility);

    let exactPosition = slider.scrollLeft;

    // const firstItem = slider.children[0];
    // const firstDuplicate = slider.children[slides.length];

    // const resetPoint = slider.scrollWidth / 2 - 4;
    // const resetPoint = firstDuplicate.offsetLeft - firstItem.offsetLeft / 2;

    let resetPoint = 0;

    const calculateResetPoint = () => {
      const firstItem = slider.children[0];
      const firstDuplicate = slider.children[slides.length];
      if (firstItem && firstDuplicate) {
        resetPoint = firstDuplicate.offsetLeft - firstItem.offsetLeft;
      }
    };
    calculateResetPoint();

    const domImages = slider.querySelectorAll("img");
    const handleImageLoad = () => calculateResetPoint();

    domImages.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      calculateResetPoint();
    });
    resizeObserver.observe(slider);

    function tick(timestamp) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current && resetPoint > 0) {
        exactPosition += (speed * delta) / 1000;

        if (exactPosition >= resetPoint) {
          exactPosition -= resetPoint;
        }

        slider.scrollLeft = exactPosition;
      } else {
        exactPosition = slider.scrollLeft;
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    }

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener("visibilitychange", setPauseFromVisibility);
      prefersReducedMotion.removeEventListener(
        "change",
        setPauseFromVisibility,
      );
      resizeObserver.disconnect();
      domImages.forEach((img) =>
        img.removeEventListener("load", handleImageLoad),
      );
    };
  }, [speed]);

  return (
    <Slider
      ref={sliderRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1.8 }}
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      onPointerDown={() => {
        isPausedRef.current = true;
      }}
      onPointerUp={() => {
        isPausedRef.current = false;
      }}
      onPointerCancel={() => {
        isPausedRef.current = false;
      }}
      onTouchStart={() => {
        isPausedRef.current = true;
      }}
      onTouchEnd={() => {
        isPausedRef.current = false;
      }}
    >
      {loopedSlides.map((src, index) => (
        <Img key={`${src}-${index}`} src={src} alt="project_photo" />
      ))}
    </Slider>
  );
}

export default SlidingImages;
