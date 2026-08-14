import Project from "./Project";
import { projects } from "./ProjectData";

function ProjectSection({ type, projectId }) {
  const filteredProject = projects.find((project) => project.id === projectId);

  if (type === "featured") return <Project project={filteredProject} />;

  if (type === "freelance")
    return (
      <>
        {projects
          .filter((project) => project.type === "freelance")
          .map((p) => (
            <Project key={p.id} project={p} />
          ))}
      </>
    );
}

export default ProjectSection;
