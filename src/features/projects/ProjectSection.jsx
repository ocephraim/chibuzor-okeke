import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import styled from "styled-components";

import Project from "./Project";
import { SectionTitle } from "../../ui/Text";
import { projects } from "./ProjectData";
import ProjectVersionModal from "./ProjectVersionModal/ProjectVersionModal";

const StyledSection = styled(motion.section)`
  gap: 4rem;
`;

const ProjectsContainer = styled.div`
  width: 100%;
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(432px, 1fr));
  gap: 2.4rem;

  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 657px) {
    grid-template-columns: 1fr;
  }
`;

function ProjectSection() {
  const [activeVersion, setActiveVersion] = useState(null); //shape: {project, version} || null
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(
    function () {
      const versionId = searchParams.get("version");

      if (versionId) {
        const matchedProject = projects.find((p) =>
          p.versions.some((v) => v.id === versionId),
        );

        if (matchedProject) {
          const matchedVersion = matchedProject.versions.find(
            (v) => v.id === versionId,
          );

          setActiveVersion({
            project: matchedProject,
            version: matchedVersion,
          });
        }
      } else {
        setActiveVersion(null);
      }
    },
    [searchParams],
  );

  function handleVersionClick(project, version) {
    setSearchParams({ version: version.id });
  }

  function handleClose() {
    setSearchParams({});
  }

  return (
    <StyledSection
      intial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.05 }}
    >
      <SectionTitle>./some work I have done</SectionTitle>

      <ProjectsContainer>
        {projects.map((p, index) => (
          <Project
            key={p.id}
            project={p}
            index={index}
            onVersionClick={(version) => handleVersionClick(p, version)}
          />
        ))}

        <AnimatePresence>
          {activeVersion && (
            <ProjectVersionModal
              project={activeVersion.project}
              version={activeVersion.version}
              onClose={handleClose}
            >
              <ProjectVersionModal.Window>
                <ProjectVersionModal.Close />
                <ProjectVersionModal.Hero />
                <ProjectVersionModal.Links />
                <ProjectVersionModal.Header />
                <ProjectVersionModal.Info />
                <ProjectVersionModal.Intro />
                <ProjectVersionModal.Section />
                <ProjectVersionModal.Footer />
              </ProjectVersionModal.Window>
            </ProjectVersionModal>
          )}
        </AnimatePresence>
      </ProjectsContainer>
    </StyledSection>
  );
}

export default ProjectSection;
