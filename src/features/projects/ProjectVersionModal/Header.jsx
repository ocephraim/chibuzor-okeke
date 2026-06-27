import styled from "styled-components";
import { Heading, SectionTitle } from "../../../ui/Text";
import { useProjectVersionModal } from "./context";

const StyledHeader = styled.div`
  padding: 0 2.4rem;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 2.4rem;

  @media screen and (max-width: 657px) {
    flex-direction: column;
    gap: 1.6rem;
    padding: 0;
  }
`;

const StyledTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  width: 50%;
  max-width: 52rem;

  @media screen and (max-width: 820px) {
    width: 100%;
    max-width: 100%;
    gap: 0.8rem;
  }
`;

const StyledTitle = styled(SectionTitle)`
  font-size: 1.4rem;
  font-family: "PT Serif", serif;
  text-transform: capitalize;

  @media screen and (max-width: 657) {
    font-size: 1.4rem;
  }
`;

const StyledHeading = styled(Heading)`
  font-family: "PT Serif", serif;

  @media screen and (max-width: 820px) {
    font-size: 3.2rem;
  }
`;

const StyledContributors = styled.div`
  width: 50%;
  height: auto;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

function Header() {
  const { version } = useProjectVersionModal();
  const { label, versionTitle, versionContributors } = version;

  return (
    <StyledHeader>
      <StyledTitleBlock>
        <StyledTitle>{label}</StyledTitle>
        <StyledHeading>{versionTitle}</StyledHeading>
      </StyledTitleBlock>
      <StyledContributors>
        <img src={versionContributors} alt="contributors" />
      </StyledContributors>
    </StyledHeader>
  );
}

export default Header;
