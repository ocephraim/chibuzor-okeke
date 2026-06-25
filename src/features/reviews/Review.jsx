import styled, { css } from "styled-components";
import ProfileImage from "../../ui/ProfileImage";
import Button from "../../ui/Button";
import Icons from "../../ui/Icons";
import { AnimatePresence, motion } from "motion/react";

const expandStyles = {
  "top-left": css`
    z-index: 3;
    top: 0;
    left: 0;
    width: calc(200% + 2.4rem);
    height: calc(200% + 2.4rem);
  `,
  "top-right": css`
    z-index: 3;
    top: 0;
    right: 0;
    width: calc(200% + 2.4rem);
    height: calc(200% + 2.4rem);
  `,
  "bottom-left": css`
    z-index: 3;
    bottom: 0;
    left: 0;
    width: calc(200% + 2.4rem);
    height: calc(200% + 2.4rem);
  `,
  "bottom-right": css`
    z-index: 3;
    bottom: 0;
    right: 0;
    width: calc(200% + 2.4rem);
    height: calc(200% + 2.4rem);
  `,
};

const collapsedStyles = {
  "top-left": css`
    top: 0;
    left: 0;
  `,
  "top-right": css`
    top: 0;
    right: 0;
  `,
  "bottom-left": css`
    bottom: 0;
    left: 0;
  `,
  "bottom-right": css`
    bottom: 0;
    right: 0;
  `,
};

const StyledReview = styled(motion.div)`
  grid-area: ${(props) => props.$gridArea};

  padding: 2.4rem;
  background: #fff;
  border-radius: 1.2rem;
  min-height: 17rem;
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.4rem;
  overflow: hidden;
  cursor: pointer;

  transition:
    width 0.5s cubic-bezier(0.34, 1.27, 0.64, 1),
    height 0.5s cubic-bezier(0.34, 1.27, 0.64, 1),
    z-index 0.5s cubic-bezier(0.34, 1.27, 0.64, 1) 0.1s;

  ${({ $isHighlighted, $expandAnchor }) =>
    $isHighlighted
      ? expandStyles[$expandAnchor]
      : collapsedStyles[$expandAnchor]}

  @media screen and (max-width: 1150px) {
    ${({ $isHighlighted, $expandAnchor }) =>
      $isHighlighted &&
      css`
        ${expandStyles[$expandAnchor]?.toString().replace(/2\.4rem/g, "1.6rem")}
      `}
  }

  @media screen and (max-width: 657px) {
    padding: 1.6rem;
    min-height: 12rem;
    position: relative;

    ${({ $isHighlighted }) =>
      $isHighlighted &&
      `
      width: 100%;
      height: 100%;
    `}
  }

  /* transition: all 7s ease-out; */
`;

const StyledReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const ReviewSummary = styled.p`
  font-family: "PT Serif", serif;
  font-weight: 700;
  font-style: italic;
  font-size: 2.4rem;
  line-height: 100%;

  align-self: flex-end;

  @media screen and (max-width: 657px) {
    font-size: 1.6rem;
  }
`;

const ReviewText = styled.p`
  font-family: "PT Serif", serif;
  font-weight: 700;
  font-style: italic;
  font-size: 2.4rem;
  line-height: 150%;

  align-self: flex-end;

  @media screen and (max-width: 657px) {
    font-size: 1.6rem;
  }
`;

const Reviewer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

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
`;

const StyledButton = styled(Button)`
  transform: ${(props) => (props.$isHighlighted ? "rotateZ(45deg)" : "")};

  @media screen and (max-width: 657px) {
    & svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const FadeText = styled(motion.div)`
  align-self: flex-end;
`;

function Review({
  review,
  gridArea,
  isHighlighted,
  onToggleHighlight,
  index,
  expandAnchor,
}) {
  const { name, role, image, reviewText, reviewSummary } = review;

  return (
    <StyledReview
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
        y: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
      }}
      viewport={{ once: false, amount: 0.05 }}
      $gridArea={gridArea}
      $isHighlighted={isHighlighted}
      $expandAnchor={expandAnchor}
      onClick={onToggleHighlight}
      title="click to expand"
    >
      <StyledReviewHeader>
        <Reviewer>
          <ProfileImage src={image} alt={`${name} photo`} variation="round" />
          <div>
            <p>{name}</p>
            <span>{role}</span>
          </div>
        </Reviewer>
        <StyledButton
          $isHighlighted={isHighlighted}
          variation="icon"
          icon={<Icons type="plus" />}
          // onClick={onToggleHighlight}
        ></StyledButton>
      </StyledReviewHeader>

      {!isHighlighted ? (
        <FadeText
          key="summary"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ReviewSummary>&ldquo;{reviewSummary}&rdquo;</ReviewSummary>
        </FadeText>
      ) : (
        <FadeText
          key="full"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <ReviewText>&ldquo;{reviewText}&rdquo;</ReviewText>
        </FadeText>
      )}
    </StyledReview>
  );
}

export default Review;
