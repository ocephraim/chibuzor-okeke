import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import styled, { keyframes } from "styled-components";

import ProfileImage from "../../ui/ProfileImage";
import SlidingImages from "./SlidingImages";
import ContactSection from "../../features/contactme/ContactSection";
import Footer from "../../ui/Footer";
import { Heading } from "../../ui/Text";
import { RevealWords } from "../../ui/RevealText";
import HomeProjects from "../../features/projects/HomeProjects";

const pulse = keyframes`
  0%{
    transform: scale(1);
    opacity: 0.6;
  }
  100%{
    transform: scale(3);
    opacity: 0;
  }
`;

const HeroSection = styled.section`
  height: 70lvh;
  width: 100%;
  align-items: flex-start;
  max-width: 112rem;

  @media screen and (max-width: 657px) {
    height: 58dvh;
  }
`;

const HeroContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & p {
    font-size: 1.4rem;
    font-weight: 500;

    @media screen and (max-width: 657px) {
      font-size: 1.3rem;
      line-height: 145%;
    }
  }
`;

const StatusDiv = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: fit-content;

  border: 1px solid var(--color-border-dark);
  border-radius: 12rem;

  padding: 1.6rem 2.4rem 1.6rem 1.6rem;
`;

const Pulse = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  background-color: var(--color-primary);
  border-radius: 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary);
    opacity: 0.6;
    border-radius: 50%;
    animation: ${pulse} 1.5s infinite ease-in-out;
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
              text="0→1 Product Designer with over 8 years of experience designing digital products and seamless experiences"
            />
          </Heading>

          <StatusDiv
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
          >
            <Pulse></Pulse>
            <p>Currently open to full-time/contract roles</p>
          </StatusDiv>
        </HeroContent>
      </HeroSection>

      <SlidingImages />

      <HomeProjects />

      <ContactSection />

      <Footer />
    </>
  );
}

export default Home;
