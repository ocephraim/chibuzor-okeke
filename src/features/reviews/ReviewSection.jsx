import styled, { keyframes } from "styled-components";
import { Heading, SectionTitle } from "../../ui/Text";
import Review from "./Review";
import { reviews } from "./ReviewData";
import { useState } from "react";
import { motion } from "motion/react";
import { RevealBlock, RevealWords } from "../../ui/RevealText";

const GRID_LAYOUT = [
  { type: "review", gridArea: "r1", review: reviews[0] },
  { type: "spacer", gridArea: "gap1" },
  { type: "review", gridArea: "r2", review: reviews[1] },
  { type: "spacer", gridArea: "gap2" },
  { type: "review", gridArea: "r3", review: reviews[2] },
  { type: "spacer", gridArea: "gap3" },
  { type: "review", gridArea: "r4", review: reviews[3] },
  { type: "spacer", gridArea: "gap4" },
];

const EXPAND_ANCHOR = {
  default: {
    r1: "top-left",
    r2: "top-left",
    r3: "bottom-left",
    r4: "bottom-right",
  },
  1150: {
    r1: "top-left",
    r2: "top-right",
    r3: "top-left",
    r4: "bottom-left",
  },
  820: {
    r1: "top-left",
    r2: "top-right",
    r3: "top-left",
    r4: "bottom-right",
  },
  657: {
    r1: "top-left",
    r2: "top-left",
    r3: "top-left",
    r4: "top-left",
  },
};

const StyledSection = styled.section``;

const ReviewsContainer = styled.div`
  width: 100%;
  display: grid;
  position: relative;
  /* grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "r1 gap1 r2 gap2"
    "gap3 r3 gap4 r4";
  grid-gap: 2.4rem;
  overflow: visible;

  @media screen and (max-width: 1150px) {
    grid-gap: 1.6rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      "r1 gap1 r2"
      "gap2 r3 gap3"
      "r4 gap4 .";
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "r1 gap1"
      "gap2 r2"
      "r3 gap3"
      "gap4 r4";
  }

  @media screen and (max-width: 657px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "r1"
      "r2"
      "r3"
      "r4";
  }
`;

const GridSpacer = styled(motion.div)`
  background-color: rgba(var(--color-accent-rgb), 0.1);
  border: 1px solid var(--color-text-100);
  border-radius: 1.2rem;
  grid-area: ${(props) => props.gridarea};
  min-height: 17rem;

  @media screen and (max-width: 657px) {
    min-height: 15rem;
    display: none;
  }
`;

function ReviewSection() {
  // const [highlightedId, setHighlightedId] = useState(() =>
  //   reviews.find((review) => review.isHighlighted?.id ?? null),
  // );
  const [highlightedId, setHighlightedId] = useState(null);

  function handleToggleHighlight(id) {
    setHighlightedId((current) => (current === id ? null : id));
  }

  function getExpandAnchor(gridArea) {
    const w = window.innerWidth;
    if (w <= 657) return EXPAND_ANCHOR[657][gridArea];
    if (w <= 820) return EXPAND_ANCHOR[820][gridArea];
    if (w <= 1150) return EXPAND_ANCHOR[1150][gridArea];
    return EXPAND_ANCHOR.default[gridArea];
  }

  return (
    <StyledSection>
      <SectionTitle>./My work ethos</SectionTitle>
      <Heading>
        <RevealBlock onMount={false}>Collaboration is the key.</RevealBlock>
        <RevealWords
          text="To deliver an impactful solution, everyone has to be equally invested in making the users’ lives much better."
          style={{ color: "var(--color-text-200)" }}
          onMount={false}
        />
      </Heading>

      <ReviewsContainer>
        {GRID_LAYOUT.map((item, index) =>
          item.type === "review" ? (
            <Review
              index={index}
              key={item.gridArea}
              review={item.review}
              gridArea={item.gridArea}
              isHighlighted={highlightedId === item.review.id}
              onToggleHighlight={() => handleToggleHighlight(item.review.id)}
              expandAnchor={getExpandAnchor(item.gridArea)}
            />
          ) : (
            <GridSpacer
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              index={index}
              viewport={{ once: false, amount: 0.05 }}
              key={item.gridArea}
              gridarea={item.gridArea}
            />
          ),
        )}
      </ReviewsContainer>
    </StyledSection>
  );
}

export default ReviewSection;
