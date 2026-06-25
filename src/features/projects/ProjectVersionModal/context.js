import { createContext, useContext } from "react";

const ProjectVersionModalContext = createContext(null);

function useProjectVersionModal() {
  const ctx = useContext(ProjectVersionModalContext);
  if (!ctx) throw new Error("Must be used inside ProjectVersionModal");
  return ctx;
}

export { useProjectVersionModal, ProjectVersionModalContext };
