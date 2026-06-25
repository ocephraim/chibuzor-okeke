import styled from "styled-components";

const Heading = styled.h1`
  font-size: 4.8rem;
  line-height: 112%;
  letter-spacing: -2%;
  font-weight: 900;

  @media screen and (max-width: 657px) {
    font-size: 2.4rem;
  }
`;

const Heading2 = styled.h2`
  font-size: 3.2rem;
  line-height: 112%;
  letter-spacing: -2%;
  font-weight: 900;

  @media screen and (max-width: 657px) {
    font-size: 1.8rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.4rem;
  line-height: 150%;

  @media screen and (max-width: 820px) {
    font-size: 1.2rem;
  }
`;

const SectionTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);

  @media screen and (max-width: 657px) {
    font-size: 1.1rem;
  }
`;

export { Heading, Heading2, Paragraph, SectionTitle };
