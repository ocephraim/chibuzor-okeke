import styled from "styled-components";
import Review from "./Review";
import { getReveiwsByIds, reviews } from "./ReviewData";

const StyledSection = styled.section`
  width: 100%;
  height: 450px;
  padding: 0 4.8rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 8rem;
  flex-wrap: wrap;

  @media screen and (max-width: 650px) {
    height: 300px;
    padding: 0 2.4rem;
    gap: 4rem;
  }
`;

function ReviewSection({ reviewIds }) {
  const ids =
    reviewIds == null
      ? null
      : Array.isArray(reviewIds)
        ? reviewIds
        : [reviewIds];

  const items = ids ? getReveiwsByIds(ids) : reviews;

  if (!items.length) return null;

  return (
    <StyledSection>
      {items.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </StyledSection>
  );
}

export default ReviewSection;
