import styled from "styled-components";
import ProfileImage from "../../ui/ProfileImage";
import SlidingImages from "./SlidingImages";
import ServicesSection from "../../features/services/ServicesSection";
import ProjectSection from "../../features/projects/ProjectSection";
import ReviewSection from "../../features/reviews/ReviewSection";
import ContactSection from "../../features/contactme/ContactSection";
import Footer from "../../ui/Footer";
import { Heading } from "../../ui/Text";

const HeroSection = styled.section`
  height: 80lvh;
  width: 100%;
  align-items: flex-start;

  @media screen and (max-width: 657px) {
    height: 75lvh;
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

const ImageContainer = styled.button`
  border: 4px solid var(--color-accent);
  border-radius: 150%;
  height: fit-content;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover img {
    filter: none;
  }
`;

function Home() {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <ImageContainer type="button">
            <ProfileImage
              src="src/assets/chibuzor.jpeg"
              alt="chibuzor_photo"
              variation="round"
            />
          </ImageContainer>
          <Heading>
            Product Designer who codes, helping startups meet user needs and
            build delightful digital experiences.
          </Heading>
          <p>
            0→1 designer. From research & ideation, to polish & launch, and
            subsequent iterations.
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
