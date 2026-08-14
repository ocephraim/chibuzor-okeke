import styled from "styled-components";

const Heading = styled.h1`
  font-family: "PT Serif, serif";
  font-size: 5.6rem;
  line-height: 107%;
  letter-spacing: -2%;
  font-weight: 400;

  @media screen and (max-width: 657px) {
    font-size: 3.2rem;
  }
`;

const Heading2 = styled.h2`
  font-family: "PT Serif, serif";
  font-size: 3.2rem;
  line-height: 105%;
  letter-spacing: -2%;
  font-weight: 400;

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
