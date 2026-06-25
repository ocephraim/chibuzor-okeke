import styled from "styled-components";
import { motion } from "motion/react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

import AboutHeader from "./AboutHeader";
import AboutBody from "./AboutBody";
import AboutStickers from "./AboutStickers";
import AboutGallery from "./AboutGallery";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;

  background-color: rgba(var(--color-bg-rgb), 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
`;

const Content = styled(motion.section)`
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: flex-start;

  @media screen and (max-width: 820px) {
    gap: 2.4rem;
  }
`;

function AboutModal({ onClose }) {
  useEffect(function () {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = originalOverflow);
  }, []);

  useEffect(
    function () {
      function handleKeyDown(e) {
        if (e.key === "Escape") onClose();
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    },
    [onClose],
  );

  return createPortal(
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Content
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <AboutHeader onClose={onClose} />
        <AboutBody />
        <AboutGallery />
        <AboutStickers />
      </Content>
    </Overlay>,
    document.body,
  );
}

export default AboutModal;
