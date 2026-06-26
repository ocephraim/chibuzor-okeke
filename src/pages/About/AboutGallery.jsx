import { motion } from "motion/react";
import styled from "styled-components";

const ResumeBlock = styled(motion.a)`
  position: absolute;
  bottom: -20%;
  left: 50%;

  width: 30rem;
  height: 40rem;
  border: 2px solid var(--color-text-800);
  border-radius: 2.4rem;
  box-shadow: 3px -4px 20px rgba(var(--color-text-800-rgb), 0.15);
  background-image: url(/cv_bg.png);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 820px) {
    width: 24rem;
    height: 32rem;
    /* left: 70%; */
    bottom: -23%;
  }
`;

function AboutGallery() {
  return (
    <ResumeBlock
      href="https://docs.google.com/document/d/e/2PACX-1vRmhhBsoqNaU3fBhu9zkiskgA6qGqumWaISgHbUzta9DUoriDjdqPN5YRG_er-ZEgK97ZKwXro-9eJB/pub"
      target="_blank"
      title="click to view resume"
      drag="x"
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={{ cursor: "grabbing", pointerEvents: "none" }}
      initial={{ y: 200, x: "-50%", rotate: 0, opacity: 0 }}
      animate={{ y: 0, x: "-50%", rotate: 10, opacity: 1 }}
      exit={{ y: 200 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: 0.8,
        rotate: { type: "spring", bounce: 0.7, delay: 1.2 },
      }}
    >
      {/* {isMaximized && (
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vRmhhBsoqNaU3fBhu9zkiskgA6qGqumWaISgHbUzta9DUoriDjdqPN5YRG_er-ZEgK97ZKwXro-9eJB/pub?embedded=true"
          style={{ padding: "0" }}
        ></iframe>
      )} */}
    </ResumeBlock>
  );
}

export default AboutGallery;
