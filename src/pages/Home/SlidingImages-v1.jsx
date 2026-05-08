import { useMemo } from "react";
import styled from "styled-components";

const slides = [
  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385723/watfootball_t0n1ij.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385719/grupa_kg2hzg.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385716/crypto_concept_jiijp7.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385740/web_concept_rvw36w.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385717/ratham_b8momb.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385711/investment_app_setg8p.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385711/ui_fragment_tu4z6q.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385718/unque_cezqhe.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385720/ratham-1_kierzt.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385713/crypto_app_oaslwa.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385713/grupa-1_kz9lne.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385713/ui_payment_z4cv9h.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385711/bv_b175dd.png",

  "https://res.cloudinary.com/diubh94u2/image/upload/q_auto/f_auto/v1777385726/webpage_axyeus.png",
];

const Slider = styled.section`
  flex-direction: row;
  gap: 0.8rem;
  padding: 1.6rem;

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

  will-change: transform;
  animation: loop 60s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @keyframes loop {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-50% - 4px));
    }
  }
`;

const Img = styled.img`
  height: 57rem;
  width: auto;

  flex: 0 0 auto;

  border-radius: 2.4rem;
  box-shadow: 0 0 30px rgba(var(--color-text-800-rgb), 0.05);
`;

function SlidingImages() {
  const loopedSlides = useMemo(() => [...slides, ...slides], []);

  return (
    <Slider>
      <SlidingContent>
        {loopedSlides.map((src, index) => (
          <Img key={`${src}-${index}`} src={src} alt="project_photo" />
        ))}
      </SlidingContent>
    </Slider>
  );
}

export default SlidingImages;
