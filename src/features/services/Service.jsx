import styled, { keyframes } from "styled-components";
import { Heading2 } from "../../ui/Text";
import { motion } from "motion/react";

const progressFill = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const StyledService = styled(motion.button)`
  padding: 2.4rem 0 0;
  border: none;
  background: transparent;
  width: 100%;

  color: var(--color-text-800);
  font-family: inherit;
  font-size: inherit;
  line-height: 145%;
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: ${(props) => (props.$isOpen ? "1" : "0")};
  transition: flex 0.3s ease-out;

  cursor: pointer;
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 2.4rem;
`;

const ServiceHeader = styled(Heading2)`
  color: ${(props) =>
    props.$isOpen ? "var(--color-text-800)" : "var(--color-text-200)"};
`;

const ServiceItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 0.8rem;
  width: 100%;

  @media screen and (min-width: 780px) {
    display: none;
  }
`;

const BottomTrack = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: 2.4rem;
  flex-shrink: 0;
  background: var(--color-text-50);
`;

const ProgressFill = styled.div`
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform: scaleX(0);
  background: var(--color-primary);
  animation: ${progressFill} 0.8s linear forwards;
`;

function Service({ title, serviceItem, tools, isOpen, onClick }) {
  return (
    <StyledService
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.08,
      }}
      viewport={{ once: true, amount: 0.05 }}
      type="button"
      $isOpen={isOpen}
      onClick={onClick}
    >
      <ServiceContent>
        <ServiceHeader $isOpen={isOpen}>{title}</ServiceHeader>

        {isOpen && <ServiceItemContainer>{serviceItem}</ServiceItemContainer>}

        {isOpen && <>{tools}</>}
      </ServiceContent>

      <BottomTrack aria-hidden>{isOpen && <ProgressFill />}</BottomTrack>
    </StyledService>
  );
}

export default Service;
