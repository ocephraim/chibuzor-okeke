import styled from "styled-components";

const Heading = styled.h1``;

const Paragraph = styled.p``;

const SectionTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-accent);

  @media screen and (max-width: 657px) {
    font-size: 1.1rem;
  }
`;

export { Heading, Paragraph, SectionTitle };
