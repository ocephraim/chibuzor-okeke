import styled from "styled-components";
import { SectionTitle } from "../../../ui/Text";
import { useProjectVersionModal } from "./context";

const Container = styled.div`
  padding: 2.4rem;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);

  display: flex;
  align-items: center;
  gap: 4.8rem;
  /* justify-content: space-between; */
  flex-wrap: wrap;

  @media screen and (max-width: 1024px) {
    gap: 2.4rem;
  }

  @media screen and (max-width: 820px) {
    padding: 1.6rem 0;
    /* gap: 1.6rem; */
  }
`;

const StyledInfo = styled.div`
  display: flex;
  gap: 0.8rem;

  @media screen and (max-width: 657px) {
    /* flex-direction: column; */
    gap: 0.6rem;
  }

  & p {
    font-size: 1.2rem;

    @media screen and (max-width: 657px) {
      font-size: 1.1rem;
    }
  }
`;

function Info() {
  const { version, project } = useProjectVersionModal();
  const { yearCompleted, versionServices } = version;
  const { industry } = project;

  return (
    <Container>
      <StyledInfo>
        <SectionTitle>Year</SectionTitle>
        <p>{yearCompleted}</p>
      </StyledInfo>

      <StyledInfo>
        <SectionTitle>Industry</SectionTitle>
        <p>{industry}</p>
      </StyledInfo>

      <StyledInfo>
        <SectionTitle>Services</SectionTitle>
        <p>{versionServices}</p>
      </StyledInfo>
    </Container>
  );
}

export default Info;
