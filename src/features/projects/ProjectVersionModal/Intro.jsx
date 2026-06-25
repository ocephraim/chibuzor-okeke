import styled from "styled-components";
import { useProjectVersionModal } from "./context";

const Container = styled.div`
  padding: 0 2.4rem 2.4rem;
  width: 100%;
  border-bottom: 1px solid var(--color-text-50);

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: flex-start;

  @media screen and (max-width: 820px) {
    gap: 1.6rem;
    padding: 0 0 1.6rem;
  }
`;

const ContextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: calc(50% - 2.4rem);

  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const OutcomeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    gap: 1.6rem;
  }
`;

const StyledGoal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
  padding: 1.6rem;
  border-radius: 1.2rem;
  background-color: var(--color-bg);
`;

const StyledOutcome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  width: 100%;
  padding: 1.6rem;
  border-radius: 1.2rem;
  background-color: var(--color-primary-100);
`;

const StyledTitle = styled.h4`
  font-size: 1.4rem;
  line-height: 145%;

  @media screen and (max-width: 657px) {
    font-size: 1.2rem;
  }
`;

const StyledBody = styled.p`
  font-size: 1.4rem;
  line-height: 150%;

  @media screen and (max-width: 657px) {
    font-size: 1.2rem;
  }
`;

function Intro() {
  const { version } = useProjectVersionModal();
  const { context, goal, outcome } = version;

  return (
    <Container>
      <ContextBlock>
        <StyledTitle>📜 Context</StyledTitle>
        {context?.map((c, i) => (
          <StyledBody key={i}>{c}</StyledBody>
        ))}
      </ContextBlock>

      <OutcomeBlock>
        <StyledGoal>
          <StyledTitle>🎯 Goal</StyledTitle>
          {goal?.map((g, i) => (
            <StyledBody key={i}>{g}</StyledBody>
          ))}
        </StyledGoal>

        <StyledOutcome>
          <StyledTitle>✅ Outcome</StyledTitle>
          {outcome?.map((o, i) => (
            <StyledBody key={i}>
              <strong>{o} </strong>
            </StyledBody>
          ))}
        </StyledOutcome>
      </OutcomeBlock>
    </Container>
  );
}

export default Intro;
