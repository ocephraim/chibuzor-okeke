import { createPortal } from "react-dom";
import { useEffect } from "react";

import { ProjectVersionModalContext } from "./context";
import Window from "./Window";
import Close from "./Close";
import Hero from "./Hero";
import Links from "./Links";
import Header from "./Header";
import Info from "./Info";
import Intro from "./Intro";
import Section from "./Section";
import Footer from "./Footer";

//USING COMPOUND COMPONENTS

//1. CREATE CONTEXT

//2. CREATE PARENT COMPONENT
function ProjectVersionModal({ project, version, onClose, children }) {
  useEffect(function () {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    document.body.style.overflow = "hidden";

    return () => (document.body.style.overflow = originalOverflow);
  }, []);

  return createPortal(
    <ProjectVersionModalContext.Provider value={{ project, version, onClose }}>
      {children}
    </ProjectVersionModalContext.Provider>,
    document.body,
  );
}

//3. CREATE CHILD COMPONENTS

//4. ATTACH CHILD COMPONENTS TO PARENT
ProjectVersionModal.Window = Window;
ProjectVersionModal.Close = Close;
ProjectVersionModal.Hero = Hero;
ProjectVersionModal.Header = Header;
ProjectVersionModal.Info = Info;
ProjectVersionModal.Intro = Intro;
ProjectVersionModal.Section = Section;
ProjectVersionModal.Footer = Footer;
ProjectVersionModal.Links = Links;

//5. EXPORT
export default ProjectVersionModal;
