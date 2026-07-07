import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import styled from "styled-components";
import { useProjectVersionModal } from "./context";

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100dvh;
  position: fixed;
  inset: 0;

  background-color: rgba(var(--color-bg-light-rgb), 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
`;

const StyledPopup = styled(motion.div)`
  border-radius: 2.4rem;
  background-color: var(--color-white);
  filter: drop-shadow(1px 1px 10px rgba(var(--color-text-800-rgb), 0.05))
    drop-shadow(7px 10px 45px rgba(var(--color-text-800-rgb), 0.1));

  width: 90%;
  max-width: 116rem;
  height: 90%;
  /* max-height: 78rem; */
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 820px) {
    border-radius: 1.6rem;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 2.4rem 2.4rem 0;
  scrollbar-width: none;
  border-radius: 2.4rem;

  @media screen and (max-width: 820px) {
    padding: 1.6rem 1.6rem 0;
    /* gap: 1.6rem; */
  }
`;

function Window({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const { onClose } = useProjectVersionModal();

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <StyledPopup
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <ScrollContainer ref={containerRef}>
          <motion.div
            id="scroll-indicator"
            style={{
              scaleX: scrollYProgress,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 7,
              originX: 0,
              zIndex: 100,
              backgroundColor: "var(--color-primary)",
            }}
          />
          {children}
        </ScrollContainer>
      </StyledPopup>
    </Overlay>
  );
}

export default Window;
