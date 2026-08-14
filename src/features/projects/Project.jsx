import { motion, AnimatePresence } from "motion/react";
import styled, { css, keyframes } from "styled-components";
import { Heading2, Paragraph, SectionTitle } from "../../ui/Text";
import Icons from "../../ui/Icons";
import Button from "../../ui/Button";
import { useEffect, useRef, useState } from "react";
import { useFollowCursor } from "../../hooks/useFollowCursor";
import { useHomeProjects } from "./HomeProjectContext";

const float = keyframes`
0%, 100% {
  transform: translateY(0)
} 50% {
  transform: translateY(-3%)
}
`;

const Featured = styled(motion.div)`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
    gap: 2.4rem;
  }
`;

const Details = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: flex-start;
  width: 100%;
  max-width: 60rem;

  @media screen and (max-width: 1000px) {
    max-width: 100%;
    gap: 1.6rem;
  }
`;

const Timeline = styled.span`
  background-color: var(--color-bg-dark);
  color: var(--color-text-light);
  font-size: 1.2rem;
  font-weight: 700;

  padding: 1rem 1.2rem;
  border-radius: 12rem;

  @media screen and (max-width: 657px) {
    font-size: 1.1rem;
  }
`;

const Title = styled(Heading2)`
  a {
    color: inherit;
  }
`;

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;

  max-width: 54rem;
  line-height: 160%;
  color: var(--color-text-400);

  p:first-child {
    font-weight: 700;
    line-height: normal;
    color: var(--color-text-800);
  }

  @media screen and (max-width: 1000px) {
    max-width: 100%;
  }
`;

const Statistics = styled.div`
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;

  span {
    border: 1px dotted var(--color-border-dark);
    border-radius: 1.2rem;
    padding: 1.2rem 1.6rem;
    font-size: 1.2rem;
    font-weight: 600;

    @media screen and (max-width: 657px) {
      font-size: 1.1rem;
    }
  }
`;

const VersionBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  width: 100%;
`;

const Version = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;

  padding: 0.8rem 0.8rem 0.8rem 1.2rem;
  border-radius: 1.6rem;
  width: 100%;
  cursor: pointer;
  background-color: none;
  overflow: hidden;

  transition: background-color 0.5s ease-out;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      background-color: var(--color-white);
    `}

  div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  @media screen and (max-width: 657px), (hover: none) {
    padding: 0.8rem;
    background-color: none;

    ${({ $isHighlighted }) =>
      $isHighlighted &&
      css`
        background-color: transparent;
      `}
  }
`;

const VersionInfo = styled.div`
  font-weight: 600;
  flex: 1 1 auto;
  min-width: 0;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      svg {
        fill: var(--color-primary);
      }
    `}

  svg {
    flex-shrink: 0;
    display: block;
    transition: all 0.5s ease-out;

    @media screen and (max-width: 657px), (hover: none) {
      display: none;
    }
  }
`;

const VersionLabel = styled.span`
  min-width: 0;

  @media screen and (max-width: 657px), (hover: none) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const ButtonContainer = styled.div`
  flex-shrink: 0;
  visibility: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-out;

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    css`
      visibility: visible;
      opacity: 1;
      transform: translateY(0px);
    `}

  @media screen and (max-width: 657px), (hover: none) {
    visibility: visible;
    opacity: 1;
    transform: translateY(0px);

    /* :nth-child(2) {
      display: none;
    } */
  }
`;

const StyledSecButton = styled(Button)`
  mix-blend-mode: darken;
`;

const Images = styled(motion.div)`
  /* flex: 1 1 40%; */
  position: relative;
  width: 90%;
  max-width: 60rem;
  max-height: 100%;
  height: clamp(25rem, 50vh, 65rem);

  animation: ${float} 5s linear infinite;
`;

const VersionImage = styled(motion.img)`
  width: clamp(26rem, 90vw, 48rem);
  max-width: 100%;
  height: auto;
  border: 2px solid var(--color-white);
  border-radius: 1.6rem;

  position: absolute;
  top: 50%;
  right: 0;
  filter: drop-shadow(0 0px 10px rgba(var(--color-text-800-rgb), 0.1));
  z-index: 1;

  @media (hover: hover) {
    cursor: none;
  }

  @media screen and (max-width: 1000px) {
    left: 4.8rem;
    max-width: 35rem;
  }

  @media screen and (max-width: 657px) {
    left: 2rem;
    max-width: 100%;
  }
`;

const ToolTip = styled(motion.div)`
  position: absolute;
  font-size: 1.6rem;
  line-height: 110%;
  font-weight: 500;
  background-color: var(--color-text-50);
  color: var(--color-text-800);
  border-radius: 100%;
  height: 8rem;
  width: 8rem;
  text-align: center;
  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 657px), (hover: none) {
    display: none;
  }
`;

const Freelance = styled(motion.div)`
  width: 100%;
  max-width: 50rem;
  flex: 1 0 auto;
  scroll-snap-align: start;

  @media screen and (max-width: 657px) {
    width: 80%;
  }

  > div {
    width: 100%;
    gap: 1.6rem;
  }

  ${Copy} {
    width: 100%;
    max-width: 54rem;
  }

  ${Version} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
    /* background-color: var(--color-white); */
    padding: 0.8rem;
  }

  ${VersionImage} {
    width: 100%;
    max-width: 42rem;
    height: auto;
    border: 2px solid var(--color-white);
    border-radius: 1.6rem;
    cursor: pointer;
    left: 0;

    position: relative;

    filter: drop-shadow(0 0px 10px rgba(var(--color-text-800-rgb), 0.05));
  }

  ${ButtonContainer} {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
    width: 100%;
  }
`;

function Project({ project, index }) {
  const {
    companyName,
    title,
    type,
    website,
    timeline,
    summary,
    intro,
    stats,
    versions,
  } = project;
  const { handleVersionClick } = useHomeProjects();

  const [isHighlighted, setIsHighlighted] = useState(null);
  const [activeCardId, setActiveCardId] = useState(versions[0]?.id);
  const [elevatedCardId, setElevatedCardId] = useState(null);
  const timerRef = useRef(null);

  const [showTooltip, setshowTooltip] = useState(null);
  const imageRef = useRef(null);
  const { x: springX, y: springY } = useFollowCursor(imageRef);

  function handleMouseEnter(id) {
    setIsHighlighted(id);

    if (activeCardId !== id) {
      clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setElevatedCardId(id);
      }, 400);
    }
  }

  function handleMouseLeave() {
    setIsHighlighted(null);
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (type === "featured")
    return (
      <Featured
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Details>
          <Timeline>{timeline}</Timeline>

          <Title>
            {title} at &nbsp;
            <a href={website} target="_blank">
              {companyName}
            </a>
          </Title>

          <Copy>
            <Paragraph>{summary}</Paragraph>
            {intro.map((text, i) => (
              <Paragraph key={i}>{text}</Paragraph>
            ))}
          </Copy>

          <Statistics>
            {stats?.map((stat, i) => (
              <span key={i}>{stat}</span>
            ))}
          </Statistics>

          <VersionBlock>
            <SectionTitle style={{ color: "var(--color-text-400)" }}>
              Products Delivered
            </SectionTitle>
            {versions.map((v, i) => (
              <Version
                $isHighlighted={isHighlighted === v.id}
                onMouseEnter={() => handleMouseEnter(v.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(v.id)}
                onBlur={handleMouseLeave}
                key={i}
              >
                <VersionInfo $isHighlighted={isHighlighted === v.id}>
                  <Icons type="tick" />
                  <VersionLabel title={v.label}>{v.label}</VersionLabel>
                </VersionInfo>

                <ButtonContainer $isHighlighted={isHighlighted === v.id}>
                  <StyledSecButton
                    variation="secondary"
                    icon={<Icons type="quickview" />}
                    aria-label={`${v.label} preview`}
                    onClick={() => handleVersionClick(v)}
                  >
                    Quick View
                  </StyledSecButton>
                  <Button
                    as={v.caseStudy ? "a" : "button"}
                    href={v.caseStudy ? v.caseStudy : null}
                    target="_blank"
                    rel="noopener, noreferrer"
                    variation="primary"
                    disabled={!v.caseStudy}
                    icon={<Icons type="casestudy" />}
                    onClick={() =>
                      window.open(v.caseStudy, "_blank", "noopener, noreferrer")
                    }
                    style={{ textDecoration: "none" }}
                  >
                    Case Study
                  </Button>
                </ButtonContainer>
              </Version>
            ))}
          </VersionBlock>
        </Details>

        <Images>
          {[...versions].reverse().map((v, i) => {
            const isHovered = isHighlighted === v.id;
            const isTop = activeCardId === v.id;

            // 1. Dynamic rotation per index (e.g. -15°, +15°, -20°, +20°...)
            const baseRotate =
              (i % 2 === 0 ? 1 : -1) * (15 + Math.floor(i / 2) * 5);

            const baseY = i % 2 === 0 ? "-60%" : "-55%";

            let currentZIndex;
            if (activeCardId === v.id) {
              currentZIndex = 10;
            } else if (elevatedCardId === v.id) {
              currentZIndex = 40;
            } else {
              currentZIndex = 1;
            }

            let animateTarget;
            if (isTop && isHovered) {
              animateTarget = {
                y: baseY,
                rotate: baseRotate,
                scale: 1.05,
              };
            } else if (isTop && !isHovered) {
              animateTarget = {
                y: baseY,
                rotate: baseRotate,
                scale: 1,
              };
            } else if (!isTop && isHovered) {
              animateTarget = {
                y: [baseY, "-130%", "-130%", baseY],
                rotate: [
                  baseRotate,
                  baseRotate + (i % 2 === 0 ? 6 : -6),
                  baseRotate + (i % 2 === 0 ? 6 : -6),
                  baseRotate,
                ],
                scale: [1, 1.05, 1.05, 1.02],
              };
            } else {
              animateTarget = {
                y: baseY,
                rotate: baseRotate,
                scale: 1,
              };
            }

            return (
              <VersionImage
                ref={imageRef}
                key={v.id || i}
                src={v.heroImage}
                alt={v.label}
                onClick={() => handleVersionClick(v)}
                onMouseEnter={() => setshowTooltip(true)}
                onMouseLeave={() => setshowTooltip(false)}
                style={{ zIndex: currentZIndex }}
                layoutId={`hero-img-${v.id}`}
                initial={false}
                animate={animateTarget}
                onAnimationComplete={() => {
                  if (elevatedCardId === v.id) {
                    setActiveCardId(v.id);
                    setElevatedCardId(null);
                  }
                }}
                transition={
                  !isTop && isHovered
                    ? {
                        duration: 0.8,
                        ease: "easeInOut",
                        times: [
                          0, 0.45, 0.55, 1,
                        ] /* 50% timing for peak height */,

                        /* zIndex: {
                        delay: 0.7,
                        duration: 0.8,
                      }, */
                      }
                    : {
                        duration: 0.35,
                        ease: "easeOut",
                      }
                }
              />
            );
          })}
          <AnimatePresence>
            {showTooltip && (
              <ToolTip
                style={{
                  left: 0,
                  top: 0,
                  x: springX,
                  y: springY,
                  zIndex: 70,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              >
                Quick View
              </ToolTip>
            )}
          </AnimatePresence>
        </Images>
      </Featured>
    );

  if (type === "freelance")
    return (
      <Freelance
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.5 }}
        viewport={{ once: true }}
      >
        <Details>
          <Timeline>{timeline}</Timeline>

          <Title>{companyName}</Title>

          <Copy>
            <Paragraph>{summary}</Paragraph>
          </Copy>

          {versions.map((v) => (
            <VersionImage
              ref={imageRef}
              onClick={() => handleVersionClick(v)}
              onMouseEnter={() => setshowTooltip(true)}
              onMouseLeave={() => setshowTooltip(false)}
              key={v.id}
              src={v.heroImage}
              layoutId={`hero-img-${v.id}`}
            />
          ))}

          <VersionBlock>
            {versions.map((v, i) => (
              <Version
                $isHighlighted={isHighlighted === v.id}
                onMouseEnter={() => handleMouseEnter(v.id)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleMouseEnter(v.id)}
                onBlur={handleMouseLeave}
                key={i}
              >
                <ButtonContainer $isHighlighted={isHighlighted === v.id}>
                  <StyledSecButton
                    variation="secondary"
                    icon={<Icons type="quickview" />}
                    aria-label={`${v.label} preview`}
                    onClick={() => handleVersionClick(v)}
                  >
                    Quick View
                  </StyledSecButton>
                  <Button
                    as={v.caseStudy ? "a" : "button"}
                    href={v.caseStudy ? v.caseStudy : null}
                    target="_blank"
                    rel="noopener, noreferrer"
                    variation="primary"
                    disabled={!v.caseStudy}
                    icon={<Icons type="casestudy" />}
                    onClick={() =>
                      window.open(v.caseStudy, "_blank", "noopener, noreferrer")
                    }
                    style={{ textDecoration: "none" }}
                  >
                    Case Study
                  </Button>
                </ButtonContainer>
              </Version>
            ))}
          </VersionBlock>
        </Details>
      </Freelance>
    );
}

export default Project;
