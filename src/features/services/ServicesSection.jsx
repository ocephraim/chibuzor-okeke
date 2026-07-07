import styled from "styled-components";
import { SectionTitle } from "../../ui/Text";
import Service from "./Service";
import ServiceTools from "./ServiceTools";
import { useState } from "react";
import ServiceItems from "./ServiceItems";
import { motion } from "motion/react";

const StyledSection = styled.section`
  margin-top: -10rem;
  background-color: var(--color-white);
  position: relative;
  z-index: 10;
`;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  justify-content: space-between;
  height: 35rem;

  @media screen and (max-width: 780px) {
    height: unset;
    min-height: 45rem;
  }
`;

const ServicesContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 45%;
  max-width: 42rem;

  @media screen and (max-width: 780px) {
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }
`;

const ServiceItemContainer = styled(motion.div)`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.6rem;
  width: 55%;
  max-width: 63rem;

  @media screen and (max-width: 780px) {
    display: none;
  }
`;

function ServicesSection() {
  const [isActiveService, setIsActiveService] = useState("design");

  return (
    <StyledSection>
      <SectionTitle>./HOW I CAN HELP</SectionTitle>

      <StyledDiv>
        <ServicesContent>
          <Service
            title="Design"
            serviceItem={<ServiceItems type="design" />}
            tools={<ServiceTools type="design" />}
            isOpen={isActiveService === "design"}
            onClick={() => setIsActiveService("design")}
          />

          <Service
            title="Engineering"
            serviceItem={<ServiceItems type="engineering" />}
            tools={<ServiceTools type="engineering" />}
            isOpen={isActiveService === "engineering"}
            onClick={() => setIsActiveService("engineering")}
          />

          <Service
            title="Strategy"
            serviceItem={<ServiceItems type="strategy" />}
            tools={<ServiceTools type="strategy" />}
            isOpen={isActiveService === "strategy"}
            onClick={() => setIsActiveService("strategy")}
          />
        </ServicesContent>

        <ServiceItemContainer
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.08,
          }}
          viewport={{ once: true, amount: 0.05 }}
        >
          <ServiceItems type={isActiveService} />
        </ServiceItemContainer>
      </StyledDiv>
    </StyledSection>
  );
}

export default ServicesSection;
