import styled from "styled-components";
import { Heading, Paragraph } from "../../ui/Text";
import { RevealBlock, RevealWords } from "../../ui/RevealText";

const MainText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.4rem;
  align-items: flex-start;

  @media screen and (max-width: 820px) {
    gap: 1.6rem;
    flex-direction: column;
  }
`;

const Intro = styled(Heading)`
  width: 47%;
  max-width: 66rem;
  font-family: "PT Serif", serif;
  line-height: 119%;
  font-weight: 400;
  font-style: italic;
  z-index: 170;

  @media screen and (max-width: 820px) {
    font-size: 3.2rem;
    width: 100%;
  }

  @media screen and (max-width: 657px) {
    font-size: 2.4rem;
  }
`;

const MoreText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 45%;

  & p {
    max-width: 43rem;
    color: var(--color-text-600);
    z-index: 170;
  }

  & h4 {
    font-size: 2.4rem;
    font-family: "PT Serif", serif;
    font-weight: 700;
    font-style: italic;
    z-index: 170;

    @media screen and (max-width: 820px) {
      font-size: 1.6rem;
    }
  }

  @media screen and (max-width: 820px) {
    gap: 1.6rem;
    width: 100%;
  }
`;

function AboutBody() {
  return (
    <MainText>
      <Intro>
        <RevealWords text="I do my best work in a startup environment, and working at the intersection of design, tech and strategy" />
      </Intro>
      <MoreText>
        <Paragraph>
          <RevealBlock delay={0.5}>
            I enjoy solving difficult problems, simplifying complex systems, and
            building products that people genuinely find useful. I’m passionate
            about helping teams move from uncertainty to clarity and creating
            meaningful impact through my work
          </RevealBlock>
        </Paragraph>
        <h4>
          <RevealWords text="Husband, Dad, Designer," delay={0.5} />
          <RevealWords
            text="Handyman,"
            delay={0.6}
            style={{ color: "var(--color-text-200)" }}
          />
          <RevealWords
            text="Footballer"
            delay={0.6}
            style={{ color: "var(--color-text-100)" }}
          />
        </h4>
        <Paragraph>
          <RevealBlock delay={0.7}>
            I’m great at collaborating in cross-functional teams have a mildly
            obsessive need for every detail to be excellent and am a lifelong
            learner...
          </RevealBlock>
        </Paragraph>
        <h4>
          <RevealWords text="“I’ll be even better tomorrow”" delay={0.7} />
        </h4>
        <Paragraph>
          <RevealBlock delay={0.8}>
            When I’m not designing, you’ll find me watching Manchester United or
            playing football, listening to music, or spending time with my
            family.
          </RevealBlock>
        </Paragraph>
      </MoreText>
    </MainText>
  );
}

export default AboutBody;
