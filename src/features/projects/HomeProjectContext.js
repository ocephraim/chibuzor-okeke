import { createContext, useContext } from "react";

const HomeProjectsContext = createContext();

function useHomeProjects() {
  const ctx = useContext(HomeProjectsContext);

  if (!ctx) throw new Error("useHomeProjects must be used inside HomeProjects");

  return ctx;
}

export { HomeProjectsContext, useHomeProjects };
