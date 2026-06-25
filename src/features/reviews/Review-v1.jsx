import styled from "styled-components";
import ProfileImage from "../../ui/ProfileImage";

const StyledReview = styled.div`
  padding: 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;

  background: url(src/assets/reviews/review_bg.svg) top left no-repeat;

  @media screen and (max-width: 657px) {
    padding: 1.6rem;
  }

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
    flex-direction: row-reverse;
    align-self: center;
    justify-content: space-between;
    gap: 4rem;

    background: none;

    @media screen and (max-width: 657px) {
      flex-direction: column-reverse;
      gap: 1.2rem;
    }
  `}
`;

const ReviewText = styled.p`
  line-height: 150%;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
    font-size: 4rem;
    line-height: 100%;
    font-family: "DM Serif Text", serif;
    font-style: italic;

    @media screen and (max-width: 657px) {
      font-size: 2.4rem;
    }
    `}
`;

const Reviewer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  @media screen and (max-width: 657px) {
    flex-direction: column;
    align-items: flex-start;
  }

  & img {
    width: 4rem;
    height: 4rem;
    border: 1px solid var(--color-text-800);
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  & p {
    font-weight: 500;
  }

  & span {
    font-size: 1.2rem;
    color: var(--color-text-400);
  }

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
    flex-direction: column;
    transform: rotateZ(-15deg);
    align-items: flex-start;

    @media screen and (max-width: 657px) {
      transform: none;
      max-width: 95%;
    }

      & img {
        border-radius: 1px;
        width: 12rem;
        height: 13rem;

        @media screen and (max-width: 657px) {
          width: 6rem;
          height: 6rem;
        } 
        }
    `}
`;

function Review({ review }) {
  const { name, role, image, reviewText, isHighlighted } = review;

  return (
    <StyledReview $isHighlighted={isHighlighted}>
      <ReviewText $isHighlighted={isHighlighted}>{reviewText}</ReviewText>
      <Reviewer $isHighlighted={isHighlighted}>
        <ProfileImage src={image} alt={`${name} photo`} variation="round" />
        <div>
          <p>{name}</p>
          <span>{role}</span>
        </div>
      </Reviewer>
    </StyledReview>
  );
}

export default Review;
