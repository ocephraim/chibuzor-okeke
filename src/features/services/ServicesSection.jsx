import styled, { keyframes } from "styled-components";
import { SectionTitle } from "../../ui/Text";
import Service from "./Service";
import Icons from "../../ui/Icons";
import ServiceTools from "./ServiceTools";
import { useState, useEffect, useCallback } from "react";
import ServiceImages from "./ServiceImages";

const StyledSection = styled.section`
  margin-top: -10rem;
  background-color: #fff;
  min-height: 70rem;

  position: relative;
  z-index: 10;
`;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 4rem;
  align-items: stretch;
  justify-content: space-between;
  height: 45rem;

  @media screen and (max-width: 657px) {
    height: 70rem;
  }
`;

const ServicesContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 42rem;

  @media screen and (max-width: 657px) {
    max-width: 100%;
    justify-content: center;
  }
`;

const imageEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.2rem) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const ServicesImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(src/assets/services_image_bg.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 60rem;
  min-height: 40rem;

  @media screen and (max-width: 657px) {
    display: none;
  }
`;

const ServicePreviewImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  animation: ${imageEnter} 0.7s ease-in-out;
`;

const ACTIVE_SERVICE_IMAGE = {
  design: { src: "src/assets/design.gif", alt: "design" },
  development: { src: "src/assets/dev.png", alt: "development" },
  strategy: { src: "src/assets/strategy.png", alt: "strategy" },
};

/** Matches the bottom progress bar duration; next service opens when the bar finishes. */
const SERVICE_CYCLE_DURATION_MS = 8000;

const SERVICE_ORDER = Object.keys(ACTIVE_SERVICE_IMAGE);

function ServicesSection() {
  const [isActiveService, setIsActiveService] = useState("design");
  const [progressEpoch, setProgressEpoch] = useState(0);
  const [useProgressAnimation, setUseProgressAnimation] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const activeImage = ACTIVE_SERVICE_IMAGE[isActiveService];

  useEffect(() => {
    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;

    if (!mq) return undefined;

    const sync = () => setUseProgressAnimation(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const selectService = useCallback((id) => {
    setProgressEpoch((n) => n + 1);
    setIsActiveService(id);
  }, []);

  const advanceToNextService = useCallback(() => {
    setProgressEpoch((n) => n + 1);
    setIsActiveService((current) => {
      const index = SERVICE_ORDER.indexOf(current);
      const safeIndex = index === -1 ? 0 : index;
      return SERVICE_ORDER[(safeIndex + 1) % SERVICE_ORDER.length];
    });
  }, []);

  return (
    <StyledSection>
      <SectionTitle>./HOW I CAN HELP</SectionTitle>

      <StyledDiv>
        <ServicesContent
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Service
            icon={<Icons type="design" />}
            title="Design"
            paragraph="A summary of my product design capabilities that can be on multiple lines. Talk a bit about capabilities, process, benefits and outcomes"
            serviceImage={<ServiceImages type="design" />}
            tools={<ServiceTools type="design" />}
            isOpen={isActiveService === "design"}
            onClick={() => selectService("design")}
            cycleDurationMs={SERVICE_CYCLE_DURATION_MS}
            useProgressAnimation={useProgressAnimation}
            onCycleComplete={advanceToNextService}
            progressKey={progressEpoch}
            isPaused={isPaused}
          />

          <Service
            icon={<Icons type="development" />}
            title="Development"
            paragraph="A summary of my product design capabilities that can be on multiple lines. Talk a bit about capabilities, process, benefits and outcomes"
            serviceImage={<ServiceImages type="development" />}
            tools={<ServiceTools type="design" />}
            isOpen={isActiveService === "development"}
            onClick={() => selectService("development")}
            cycleDurationMs={SERVICE_CYCLE_DURATION_MS}
            useProgressAnimation={useProgressAnimation}
            onCycleComplete={advanceToNextService}
            progressKey={progressEpoch}
            isPaused={isPaused}
          />

          <Service
            icon={<Icons type="strategy" />}
            title="Strategy"
            paragraph="A summary of my product design capabilities that can be on multiple lines. Talk a bit about capabilities, process, benefits and outcomes"
            serviceImage={<ServiceImages type="strategy" />}
            tools={<ServiceTools type="design" />}
            isOpen={isActiveService === "strategy"}
            onClick={() => selectService("strategy")}
            cycleDurationMs={SERVICE_CYCLE_DURATION_MS}
            useProgressAnimation={useProgressAnimation}
            onCycleComplete={advanceToNextService}
            progressKey={progressEpoch}
            isPaused={isPaused}
          />
        </ServicesContent>

        <ServicesImage>
          <ServicePreviewImage
            key={isActiveService}
            src={activeImage.src}
            alt={activeImage.alt}
          />
        </ServicesImage>
      </StyledDiv>
    </StyledSection>
  );
}

export default ServicesSection;
