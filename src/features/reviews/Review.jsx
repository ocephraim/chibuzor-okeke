import { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "motion/react";

import ProfileImage from "../../ui/ProfileImage";
import { ReviewBg } from "../../ui/SVGs";

const ReviewContainer = styled(motion.div)`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;

  padding: 4rem;
  margin: 0 auto;

  position: relative;
  min-height: 13rem;
  width: 100%;
  max-width: 47rem;
  overflow: visible;

  cursor: default;

  @media screen and (max-width: 650px) {
    padding: 3rem 2rem;
    min-height: 10rem;
  }
`;

const ReviewBgLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  z-index: 1;

  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const ImageContainer = styled(motion.div)`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

const ReviewContent = styled(motion.div)`
  z-index: 3;
`;

const ReviewSummary = styled(motion.p)`
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

const ReviewText = styled(motion.p)`
  font-family: "PT Serif", serif;
  font-weight: 700;
  font-style: italic;
  font-size: 1.6rem;
  line-height: 150%;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;

  p {
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
    line-height: normal;
    font-style: normal;
  }

  span {
    font-size: 1.2rem;
    color: var(--color-text-400);
    font-weight: normal;
    line-height: normal;
    font-style: normal;
  }

  @media screen and (max-width: 657px) {
    font-size: 1.3rem;
    gap: 1.6rem;

    p,
    span {
      font-size: 1.1rem;
    }
  }
`;

const Reviewer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  img {
    height: 4rem;
    width: auto;
  }

  div {
    text-align: left;
  }
`;

function Review({ review }) {
  const { name, image, role, reviewText, reviewSummary } = review;
  const [isHighlighted, setIsHighlighted] = useState(false);

  function toggleHighlight() {
    setIsHighlighted(!isHighlighted);
  }

  return (
    <AnimatePresence>
      <ReviewContainer
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          layout: { duration: 0.2, ease: "easeOut" },
          duration: 0.4,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
        onTouchStart={toggleHighlight}
      >
        <ReviewBgLayer
          initial={{ clipPath: "inset(0% 100% 0% 0%)", opacity: 0 }}
          whileInView={{ clipPath: "inset(-20% -20% -20% -20%)", opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <ReviewBg />
        </ReviewBgLayer>

        <ImageContainer>
          <ProfileImage
            src={image}
            alt={`${name} photo`}
            layoutId={`${name}-photo`}
          />
        </ImageContainer>

        <ReviewContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1.1 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {isHighlighted ? (
              <ReviewText
                // key="text" //key required by AnimatePresence to know when children swap
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                &ldquo;{reviewText}&rdquo;
                <Reviewer>
                  <ProfileImage
                    src={image}
                    alt={`${name} photo`}
                    layoutId={`${name}-photo`}
                  />

                  <div>
                    <p>{name}</p>
                    <span>{role}</span>
                  </div>
                </Reviewer>
              </ReviewText>
            ) : (
              <ReviewSummary
                // key="summary"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                &ldquo;{reviewSummary}&rdquo;
              </ReviewSummary>
            )}
          </AnimatePresence>
        </ReviewContent>
      </ReviewContainer>
    </AnimatePresence>
  );
}

export default Review;
