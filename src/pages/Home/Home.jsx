import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import styled from "styled-components";

import ProfileImage from "../../ui/ProfileImage";
import SlidingImages from "./SlidingImages";
import ServicesSection from "../../features/services/ServicesSection";
import ProjectSection from "../../features/projects/ProjectSection";
import ReviewSection from "../../features/reviews/ReviewSection";
import ContactSection from "../../features/contactme/ContactSection";
import Footer from "../../ui/Footer";
import { Heading } from "../../ui/Text";
import { RevealBlock, RevealWords } from "../../ui/RevealText";

const HeroSection = styled.section`
  height: 80lvh;
  width: 100%;
  align-items: flex-start;

  @media screen and (max-width: 657px) {
    height: 68dvh;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 90rem;
  align-self: center;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & p {
    font-size: 1.6rem;
    font-weight: 500;

    @media screen and (max-width: 657px) {
      font-size: 1.4rem;
      line-height: 145%;
    }
  }
`;

const ImageContainer = styled(motion.button)`
  border: 4px solid var(--color-primary);
  border-radius: 150%;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;

  &:hover img {
    filter: none;
  }
`;

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection>
        <HeroContent>
          <ImageContainer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            type="button"
            onClick={() => navigate("/about")}
            layoutId="my_headshot_container"
          >
            <ProfileImage
              src="/chibuzor.jpeg"
              alt="chibuzor_headshot"
              variation="round"
            />
          </ImageContainer>
          <Heading>
            <RevealWords
              onMount={true}
              text="Product Designer/Engineer crafting delightful digital experiences that drive business growth and meet the users' needs."
            />
          </Heading>

          <p>
            <RevealBlock onMount={true} delay={1.5}>
              0→1 designer. From research & ideation, to polish & launch, and
              subsequent iterations.
            </RevealBlock>
          </p>
        </HeroContent>
      </HeroSection>

      <SlidingImages />

      <ServicesSection />

      <ProjectSection />

      <ReviewSection />

      <ContactSection />

      <Footer />
    </>
  );
}

export default Home;
