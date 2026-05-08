import styled from "styled-components";
import { SectionTitle } from "../../ui/Text";
import Review from "./Review";
import { reviews } from "./ReviewData";

const StyledSection = styled.section``;

const ReviewsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 657px) {
    grid-template-columns: repeat(2, 1fr);
  }

  :first-child {
    grid-column: span 2;
    grid-row: span 2;
    justify-content: center;
  }
`;

function ReviewSection() {
  return (
    <StyledSection>
      <SectionTitle>./I asked them to say something nice</SectionTitle>

      <ReviewsContainer>
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ReviewsContainer>
    </StyledSection>
  );
}

export default ReviewSection;
