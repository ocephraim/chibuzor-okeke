import styled from "styled-components";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

import { useCopyEmail } from "../../../hooks/useCopyEmail";
import { useFollowCursor } from "../../../hooks/useFollowCursor";
import { SectionTitle } from "../../../ui/Text";

const StyledFooter = styled.footer`
  background-color: var(--color-text-800);
  border: none;
  padding: 4rem 0;

  margin-right: -2.4rem;
  margin-left: -2.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`;

const StyledSectionTitle = styled(SectionTitle)`
  & span {
    color: var(--color-text-50);
  }
`;

const EmailBlock = styled.div`
  width: 100%;
  position: relative;
  padding: 0 2.4rem;
  background-color: transparent;
  border: none;

  @media (hover: hover) {
    cursor: none;
  }

  & h4 {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    font-size: 10rem;
    overflow-wrap: break-word;
    letter-spacing: -6%;
    font-weight: 900;
    line-height: 100%;
    text-align: center;
    text-decoration: underline;
    color: var(--color-text-50);
    opacity: 0.08;

    @media screen and (max-width: 820px) {
      font-size: 7rem;
    }

    @media screen and (max-width: 657px) {
      font-size: 5rem;
    }
  }
`;

const ToolTip = styled(motion.div)`
  position: fixed;
  font-size: 1.6rem;
  line-height: 110%;
  font-weight: 500;
  background-color: var(--color-text-50);
  color: var(--color-text-800);
  border-radius: 100%;
  height: 8rem;
  width: 8rem;
  text-align: center;
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  /* Shift by exactly half of the width/height to center on the cursor */
  /* margin-left: -20rem;
  margin-top: -6rem; */
`;

function Footer() {
  const { copied, EMAIL, handleCopyEmail } = useCopyEmail();
  // const emailRef = useRef(null);
  // const { x, y } = useFollowCursor(emailRef);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e) {
    const rect = e.target.getBoundingClientRect();

    x.set(e.clientX);
    y.set(e.clientY);
  }

  return (
    <StyledFooter>
      <StyledSectionTitle>
        <span>Building something exciting?</span> Lets chat
      </StyledSectionTitle>

      <EmailBlock
        as="a"
        href={isHovered ? null : `mailto:${EMAIL}`}
        aria-label={`Copy email address ${EMAIL}`}
        title="Click to copy email"
        onClick={handleCopyEmail}
        onMouseEnter={() => {
          if (window.matchMedia("(hover: hover)").matches) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        // ref={emailRef}
      >
        <h4>{EMAIL}</h4>
        <AnimatePresence>
          {isHovered && (
            <ToolTip
              style={{
                left: 0,
                top: 0,
                x: springX,
                y: springY,
                zIndex: 9,
                translateX: "-220%",
                translateY: "-75%",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {copied ? "Copied" : "Click to copy"}
            </ToolTip>
          )}
        </AnimatePresence>
      </EmailBlock>
    </StyledFooter>
  );
}

export default Footer;
