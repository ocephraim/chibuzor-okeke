import styled from "styled-components";
import Button from "../../../ui/Button";
import ButtonShortcuts from "../../../ui/ButtonShortcuts";
import { useProjectVersionModal } from "./context";
import { useEffect } from "react";
import { motion } from "motion/react";

const ButtonContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  padding: 1.2rem 2.4rem;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);

  width: fit-content;
  border-radius: 0 2.4rem 0 2.4rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;
  justify-content: center;

  @media screen and (max-width: 820px) {
    border-radius: 0 1.6rem 0 1.6rem;
  }
`;

const StyledButton = styled(Button)`
  & span {
    border: 1px solid var(--color-text-200);
    background-color: transparent;
    mix-blend-mode: normal;
    color: var(--color-text-600);
    box-shadow: 0 1.5px 0px rgba(var(--color-text-800-rgb), 0.2);
  }
`;

function Close() {
  const { onClose } = useProjectVersionModal();

  useEffect(
    function () {
      async function handleKeydown(e) {
        const isCloseShortcut = e.key === "Escape";

        if (!isCloseShortcut) return;

        e.preventDefault();
        await onClose();
      }

      window.addEventListener("keydown", handleKeydown);

      return () => {
        window.removeEventListener("keydown", handleKeydown);
      };
    },
    [onClose],
  );

  return (
    <ButtonContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledButton
        type="button"
        variation="tertiary"
        icon="✘"
        shortcuts={<ButtonShortcuts type="close" />}
        onClick={onClose}
      >
        Close
      </StyledButton>
    </ButtonContainer>
  );
}

export default Close;
