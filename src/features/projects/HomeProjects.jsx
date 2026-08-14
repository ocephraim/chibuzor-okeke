import { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimatePresence } from "motion/react";
import { useSearchParams } from "react-router-dom";

import { SectionTitle } from "../../ui/Text";
import { projects } from "./ProjectData";
import ProjectSection from "./ProjectSection";
import ProjectVersionModal from "./ProjectVersionModal/ProjectVersionModal";
import { HomeProjectsContext } from "./HomeProjectContext";
import ReviewSection from "../reviews/ReviewSection";

const FeaturedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 16rem;
  }

  @media screen and (max-width: 657px) {
    margin-top: 0;
    gap: 8rem;
  }
`;

const FreelanceSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  background-color: var(--color-accent);
  padding-top: 8rem;
  padding-bottom: 8rem;
  padding-right: 1rem;

  > div {
    display: flex;
    flex-wrap: nowrap;
    gap: 3.2rem;

    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 24px;
    touch-action: pan-x;

    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;

    @media screen and (max-width: 657px) {
      gap: 4.8rem;
    }
  }
`;

function HomeProjects() {
  const [activeVersion, setActiveVersion] = useState(null); //shape: {project, version} || null
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const versionId = searchParams.get("quickview");

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
  }, [searchParams]);

  function handleVersionClick(version) {
    setSearchParams({ quickview: version.id });
  }

  function handleClose() {
    setSearchParams({});
  }

  return (
    <HomeProjectsContext.Provider
      value={{ handleVersionClick, handleClose, activeVersion }}
    >
      <FeaturedSection>
        <ReviewSection reviewIds="krishna" />
        <SectionTitle>./Featured Work</SectionTitle>
        <div>
          <ProjectSection type="featured" projectId="unque" />
          <ProjectSection type="featured" projectId="ratham" />
          <ReviewSection reviewIds={["boma", "wale"]} />
          <ProjectSection type="featured" projectId="grupa" />
        </div>
      </FeaturedSection>

      <FreelanceSection>
        <SectionTitle>./Freelance Work</SectionTitle>
        <div>
          <ProjectSection type="freelance" />
        </div>
      </FreelanceSection>

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
    </HomeProjectsContext.Provider>
  );
}

export default HomeProjects;
