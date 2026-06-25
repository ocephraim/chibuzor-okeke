import { motion, useInView } from "motion/react";
import { useRef } from "react";
import styled from "styled-components";

//1. BLOCK REVEAL – Animate the entire block of text
const BlockMask = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
`;

const SlideUpSpan = styled(motion.span)`
  display: inline-block;
`;

//ease: [0.215, 0.61, 0.355, 1]

export function RevealBlock({
  children,
  delay = 0,
  duration = 0.4,
  onMount = false,
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });
  const shouldAnimate = isInView || onMount;

  return (
    <BlockMask ref={containerRef}>
      <SlideUpSpan
        initial={{ y: "100%" }}
        animate={shouldAnimate ? { y: 0 } : undefined}
        exit={{ y: "100%" }}
        transition={{ duration, ease: [0.215, 0.61, 0.355, 1], delay }}
      >
        {children}
      </SlideUpSpan>
    </BlockMask>
  );
}

//2. STAGGERED WORD REVEAL – Animates word by word

const WordWrapper = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
`;

const SingleWord = styled(motion.span)`
  display: inline-block;
  /* margin-right: 0.25em; */
  /* white-space: pre; */
`;

export function RevealWords({
  text = "",
  delay = 0,
  duration = 0.4,
  onMount = false,
  style,
}) {
  const words = text.split(" ");

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.05 });
  const shouldAnimate = onMount || isInView;

  return (
    <>
      {words.map((word, idx) => (
        <WordWrapper key={idx} style={style} ref={containerRef}>
          <SingleWord
            initial={{ y: "100%" }}
            animate={shouldAnimate ? { y: 0 } : undefined}
            exit={{ y: "100%" }}
            transition={{
              duration,
              ease: [0.215, 0.61, 0.355, 1],
              delay: delay + idx * 0.04,
            }}
          >
            {word}&nbsp;
          </SingleWord>
        </WordWrapper>
      ))}
    </>
  );
}
