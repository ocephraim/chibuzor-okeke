import styled from "styled-components";
import { motion } from "motion/react";

import { useProjectVersionModal } from "./context";

const HeroImage = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  border-radius: 0;
  /* border: 1px solid var(--color-text-50); */

  & img {
    object-fit: cover;
    object-position: center;
    border-radius: 0;
  }
`;

function Hero() {
  const { version } = useProjectVersionModal();
  const { heroImage, label, id } = version;

  return (
    <HeroImage>
      <motion.img
        src={heroImage}
        alt={label}
        layoutId={`hero-img-${id}`}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </HeroImage>
  );
}

export default Hero;
