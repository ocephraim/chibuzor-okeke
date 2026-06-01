import styled from "styled-components";
import Project from "./Project";
import { SectionTitle } from "../../ui/Text";
import { projects } from "./ProjectData";

const StyledSection = styled.section`
  gap: 4.8rem;
`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-columns: repeat(auto-fit, minmax(432px, 1fr)); */
  gap: 2.4rem;

  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 657px) {
    grid-template-columns: 1fr;
  }
`;

function ProjectSection() {
  return (
    <StyledSection>
      <SectionTitle>./some work I have done</SectionTitle>

      <ProjectsContainer>
        {projects.map((p) => (
          <Project key={p.id} project={p} />
        ))}
      </ProjectsContainer>
    </StyledSection>
  );
}

export default ProjectSection;
