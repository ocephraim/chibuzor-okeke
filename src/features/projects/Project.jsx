import { motion } from "motion/react";
import styled from "styled-components";

const StyledProject = styled(motion.div)`
  width: 100%;
  height: 43rem;
  padding: 2.4rem 1.6rem;
  border-bottom: 1px solid var(--color-text-100);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;

  overflow: hidden;
  /* grid-column: ${(props) => (props.$span ? `span ${props.$span}` : "")}; */
  /* grid-column: span 2; */

  @media screen and (max-width: 657px) {
    gap: 1.6rem;
    padding: 0;
    padding-bottom: 2.4rem;
    grid-column: span 1;
    height: 35rem;
  }
`;

const ProjectInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const ProjectDetails = styled.div`
  max-width: 40rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-text-400);
    line-height: 145%;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 657px) {
    gap: 0.8rem;
  }
`;

const ClientDetails = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: baseline;

  & h3 {
    font-weight: 600;
    font-size: 1.4rem;

    @media screen and (max-width: 657px) {
      font-size: 1.3rem;
    }
  }

  & span {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-text-400);

    @media screen and (max-width: 657px) {
      font-size: 1.1rem;
    }
  }
`;

const ProjectServices = styled.div`
  display: flex;
  gap: 0.8rem;

  & p {
    text-transform: capitalize;
    text-decoration: underline;
    color: var(--color-text-400);
    font-weight: 500;
    font-size: 1.2rem;

    @media screen and (max-width: 657px) {
      font-size: 1.1rem;
    }
  }
`;

const ProjectVersions = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  border-radius: 1.2rem;

  display: flex;
  flex-wrap: nowrap;
  gap: 0.8rem;

  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 0;
  touch-action: pan-x;

  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  @media screen and (max-width: 657px) {
    padding: 0;
    gap: 0.4rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & button {
    flex: 1 0 auto;
    width: clamp(26rem, 78vw, 40rem);
    max-width: ${(props) => (props.$numOfVersions > 1 ? "95%" : "100%")};
    height: 100%;
    position: relative;
    overflow: hidden;
    outline: none;

    scroll-snap-align: start;

    border: 2px solid white;
    border-radius: 1.2rem;
    cursor: pointer;
    padding: 0;
    appearance: none;
    background-color: transparent;

    transition: all 0.4s ease-out;
  }

  & button::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      to bottom,
      rgba(var(--color-text-800-rgb), 0.5) 40%,
      rgba(var(--color-text-800-rgb), 0.5) 100%
    );
    opacity: 0;
    z-index: 1;

    transition: opacity 0.4s ease-out;
  }

  & button:focus-visible img,
  button:hover img {
    scale: 1.03;
  }

  & button:focus-visible::after,
  button:hover::after {
    opacity: 1;
  }

  & button:hover span,
  button:focus-visible span {
    transform: translateY(0);
    opacity: 1;
  }
`;

const StyledLabel = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text-50);
  opacity: 0;
  position: absolute;
  left: 1.6rem;
  bottom: 1.2rem;
  z-index: 2;

  transform: translateY(50px);
  transition: all 0.4s ease-out;
  transition-delay: 0.08s;
`;

function Project({ project, index = 0, onVersionClick }) {
  const {
    companyName,
    timeline,
    servicesRendered,
    summary,
    versions,
    industry,
  } = project;
  const numOfVersions = versions.length;

  return (
    <StyledProject
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.08,
      }}
      viewport={{ once: false, amount: 0.05 }}
    >
      <ProjectInfo>
        <ProjectDetails>
          <ClientDetails>
            <h3>{companyName}</h3>
            <span>{timeline}</span>
          </ClientDetails>

          <p>{summary}</p>

          <ProjectServices>
            {servicesRendered.map((service, i) => (
              <p key={i}>{service}</p>
            ))}
          </ProjectServices>
        </ProjectDetails>
      </ProjectInfo>

      <ProjectVersions
        role="region"
        aria-roledescription="carousel"
        aria-label="Project version previews"
        $numOfVersions={numOfVersions}
      >
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            aria-label={`${v.label} preview`}
            onClick={() => onVersionClick(v)}
            style={
              {
                // backgroundColor: "var(--color-accent)",
              }
            }
          >
            {v.heroImage && (
              <motion.img
                src={v.heroImage}
                alt={v.label}
                layoutId={`hero-img-${v.id}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  transition: "all 0.4s ease-out",
                }}
              />
            )}

            <StyledLabel style={{ zIndex: 2 }}>{v.label}</StyledLabel>
          </button>
        ))}
      </ProjectVersions>
    </StyledProject>
  );
}

export default Project;
