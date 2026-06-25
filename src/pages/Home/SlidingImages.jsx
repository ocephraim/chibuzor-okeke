import { motion } from "motion/react";
import { useMemo } from "react";
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
  padding-block: 1.6rem;

  overflow: hidden;
  width: 100%;
  max-width: 100vw;

  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlidingContent = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-shrink: 0;

  width: max-content;

  will-change: transform;
  animation: loop 60s linear infinite;

  &:hover,
  &:active {
    animation-play-state: paused;
  }

  @keyframes loop {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 0.4rem));
    }
  }
`;

const Img = styled.img`
  height: 47rem;
  width: auto;
  border-radius: 2.4rem;

  flex: 0 0 auto;

  /* box-shadow: 0 0 30px rgba(var(--color-text-800-rgb), 0.05); */
  filter: drop-shadow(0 0 20px rgba(var(--color-text-800-rgb), 0.05));
  pointer-events: none;

  @media screen and (max-width: 657px) {
    height: 30rem;
  }
`;

function SlidingImages() {
  const loopedSlides = useMemo(() => [...slides, ...slides], []);

  return (
    <Slider
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1.8 }}
    >
      <SlidingContent>
        {loopedSlides.map((src, index) => (
          <Img key={`${src}-${index}`} src={src} alt="project_photo" />
        ))}
      </SlidingContent>
    </Slider>
  );
}

export default SlidingImages;
