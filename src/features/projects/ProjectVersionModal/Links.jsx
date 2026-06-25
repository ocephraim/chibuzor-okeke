import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styled from "styled-components";

import Button from "../../../ui/Button";
import Icons from "../../../ui/Icons";
import ButtonShortcuts from "../../../ui/ButtonShortcuts";
import { useProjectVersionModal } from "./context";

const ButtonContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;

  padding: 1.2rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);

  width: fit-content;
  border-radius: 2.4rem 0 2.4rem 0;

  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;

  @media screen and (max-width: 820px) {
    border-radius: 1.6rem 0 1.6rem 0;
  }
`;

const StyledSecButton = styled(Button)`
  mix-blend-mode: darken !important;
`;

const CaseButton = styled.div`
  position: relative;
  height: fit-content;
`;

const Tooltip = styled(motion.span)`
  position: absolute;
  left: 50%;
  bottom: 100%;
  background-color: var(--color-text-800);
  color: #fff;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.8rem 0.8rem;
  border-radius: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
`;

function Links() {
  const { version } = useProjectVersionModal();
  const { caseStudy, liveUrl } = version;
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef(null);

  function handleShowTooltip() {
    setShowTooltip(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2500);
  }

  function handleHideTooltip() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setShowTooltip(false);
  }

  return (
    <ButtonContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CaseButton
        onMouseEnter={handleShowTooltip}
        onMouseLeave={handleHideTooltip}
        onFocus={handleShowTooltip}
        onBlur={handleHideTooltip}
        onTouchStart={handleShowTooltip}
      >
        <Button
          type="button"
          variation="primary"
          icon={<Icons type="casestudy" />}
          shortcuts={<ButtonShortcuts type="casestudy" />}
          disabled={!caseStudy}
          onClick={() =>
            window.open(caseStudy, "_blank", "noopener, nooreferrer")
          }
        >
          Full Case Study
        </Button>

        <AnimatePresence>
          {!caseStudy && showTooltip && (
            <Tooltip
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: -5, x: "-50%" }}
              exit={{ opacity: 0, y: 30, x: "-50%" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Case study coming soon
            </Tooltip>
          )}
        </AnimatePresence>
      </CaseButton>

      {liveUrl && (
        <StyledSecButton
          // as='a'
          // href={liveUrl}
          // target='_blank'
          // rel="noopener, noreferrer"
          variation="secondary"
          icon={<Icons type="livelink" />}
          shortcuts={<ButtonShortcuts type="livelink" />}
          onClick={() => window.open(liveUrl, "_blank", "noopener, noreferrer")}
        >
          Live Link
        </StyledSecButton>
      )}
    </ButtonContainer>
  );
}

export default Links;
