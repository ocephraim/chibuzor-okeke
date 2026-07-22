import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonShortcuts from "../../ui/ButtonShortcuts";
import ProfileImage from "../../ui/ProfileImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ImageContainer = styled(motion.button)`
  border: 4px solid var(--color-primary);
  border-radius: 150%;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:hover img {
    filter: none;
  }
`;

const StyledButton = styled(Button)`
  padding: 1.2rem 2.4rem;
  border-radius: 2.4rem;
  font-size: 1.4rem;

  & span {
    border: 1px solid var(--color-text-200);
    background-color: transparent;
    mix-blend-mode: normal;
    color: var(--color-text-600);
    box-shadow: 0 1.5px 0px rgba(var(--color-text-800-rgb), 0.2);
  }
`;

function AboutHeader({ onClose }) {
  const navigate = useNavigate();

  return (
    <Header>
      <ImageContainer
        type="button"
        onClick={() => navigate("/")}
        layoutId="my_headshot_container"
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <ProfileImage
          src="/chibuzor.jpeg"
          alt="chibuzor_headshot"
          variation="round"
        />
      </ImageContainer>

      <StyledButton
        type="button"
        variation="tertiary"
        icon="✘"
        shortcuts={<ButtonShortcuts type="close" />}
        onClick={onClose}
      >
        Close
      </StyledButton>
    </Header>
  );
}

export default AboutHeader;
