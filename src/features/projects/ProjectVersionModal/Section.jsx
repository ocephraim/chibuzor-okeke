import styled, { css } from "styled-components";
import { SectionTitle } from "../../../ui/Text";
import { useProjectVersionModal } from "./context";

const variations = {
  web: css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    grid-gap: 1.6rem;

    & img {
      width: 100%;
    }

    @media screen and (max-width: 657px) {
      & img {
        width: 95%;
      }
    }
  `,

  mobile: css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    grid-gap: 2.4rem;

    & img {
      width: 100%;
    }

    @media screen and (max-width: 657px) {
      & img {
        width: 12rem;
      }
    }
  `,
};

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding: 0 0 2.4rem;
  border-bottom: 1px solid var(--color-text-50);

  @media screen and (max-width: 820px) {
    gap: 1.6rem;
    padding: 0 0 1.6rem;
  }
`;

const StyledTitle = styled(SectionTitle)`
  padding: 0 2.4rem;

  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

const SectionImages = styled.div`
  @media screen and (max-width: 657px) {
    display: flex;
    flex-wrap: nowrap;
    gap: 1.2rem;

    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 0;
    touch-action: pan-x;

    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
  }

  ${(props) => variations[props.variation]}
`;

function Section() {
  const { version } = useProjectVersionModal();
  const { gallery } = version;

  return (
    <>
      {gallery?.map((g, i) => (
        <StyledSection key={i}>
          <StyledTitle>{g.title}</StyledTitle>
          <SectionImages variation={g.platform}>
            {g.images?.map((image, imgIndex) => (
              <img
                src={image.imageSrc}
                key={imgIndex}
                alt={image.caption}
                title={image.caption}
              />
            ))}
          </SectionImages>
        </StyledSection>
      ))}
    </>
  );
}

export default Section;
