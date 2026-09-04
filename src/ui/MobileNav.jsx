import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import styled from "styled-components";

import { useBrowserTime } from "../hooks/useBrowserTime";
import Button from "./Button";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { SectionTitle } from "./Text";
import ChangeTheme from "./ChangeTheme";

const StyledMobileNav = styled(motion.nav)`
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  backdrop-filter: blur(10px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  @media screen and (min-width: 820px) {
    display: none;
  }
`;

const MenuLinks = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;
`;

const MenuControl = styled.div`
  width: 100%;
  height: 6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.4rem;

  &:link,
  &:visited {
    font-weight: 600;
    text-decoration: none;
    color: var(--color-text-800);
  }
`;
const StyledButton = styled(Button)`
  font-size: 1.4rem;
`;

const NavList = styled.ul`
  width: 100%;
  min-width: 22rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  & a {
    width: 100%;
    padding: 0.8rem 0;
  }
`;

const MidSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;

  & p {
    color: var(--color-text-400);
  }
`;

const MetaInfo = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const NavFooter = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const EmailBlock = styled(motion.div)`
  width: 100%;
  position: relative;
  background-color: transparent;
  border: none;
  padding: 0 0 2rem;

  & h4 {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    font-size: 4.5rem;
    width: 100%;
    overflow-wrap: break-word;
    letter-spacing: -6%;
    font-weight: 900;
    line-height: 100%;
    text-decoration: underline;
    color: var(--color-text-800);

    @media screen and (min-width: 540px) {
      font-size: 6.4rem;
    }
  }
`;

//motion variants
const navVariant = {
  hidden: {
    height: "6rem",
    backgroundColor: "rgba(var(--color-bg-light-rgb), 0.4)",
    transition: { ease: "easeOut", duration: 0.5, delay: 0.3 },
  },
  visible: {
    height: "100dvh",
    backgroundColor: "rgba(var(--color-bg-light-rgb), 0.95)",
    transition: { ease: "easeOut", duration: 0.1 },
  },
};

const menuVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5, delay: 0.1 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.4, delay: 0.2 },
  },
};

const themeVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5, delay: 0.2 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.4, delay: 0.2 },
  },
};

const metaVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5, delay: 0.25 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.4, delay: 0.2 },
  },
};

const emailVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { ease: "easeOut", duration: 0.5, delay: 0.3 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.4, delay: 0 },
  },
};
//motion variants

function NavClock() {
  const time = useBrowserTime();

  return (
    <div>
      <span>{time}</span>
    </div>
  );
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { EMAIL } = useCopyEmail();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleOpenNav() {
    setIsOpen(!isOpen);
  }

  function handleWorkClick(e) {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
    }

    setTimeout(() => {
      const element = document.getElementById("work");

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 1350);
  }

  return (
    <>
      <StyledMobileNav
        $isOpen={isOpen}
        variants={navVariant}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
      >
        <MenuLinks>
          <MenuControl>
            <StyledNavLink to="/">Chibuzor Okeke</StyledNavLink>
            <StyledButton
              type="button"
              variation="tertiary"
              onClick={handleOpenNav}
            >
              {isOpen ? `✘ Close` : `• Menu`}
            </StyledButton>
          </MenuControl>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  width: "100%",
                }}
                // transition={{
                //   ease: "easeOut",
                //   duration: 0.5,
                // }}
              >
                <NavList>
                  <StyledNavLink to="/about" onClick={handleOpenNav}>
                    • About
                  </StyledNavLink>
                  <StyledNavLink onClick={handleWorkClick}>
                    • Work
                  </StyledNavLink>
                  <StyledNavLink
                    as="a"
                    href={`mailto:${EMAIL}`}
                    onClick={handleOpenNav}
                  >
                    • Lets chat
                  </StyledNavLink>
                </NavList>
              </motion.div>
            )}
          </AnimatePresence>
        </MenuLinks>

        <AnimatePresence>
          {isOpen && (
            <MidSection
              variants={themeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <SectionTitle>Select Theme</SectionTitle>
              <ChangeTheme closeNav={handleOpenNav} />
            </MidSection>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <NavFooter>
              <motion.div
                variants={metaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // transition={{
                //   ease: "easeOut",
                //   duration: 0.5,
                //   delay: 0.25,
                // }}
                style={MetaInfo}
              >
                <span>Based in Lagos, NG</span>
                <NavClock />
              </motion.div>

              <EmailBlock as="a" href={`mailto:${EMAIL}`}>
                <motion.h4
                  variants={emailVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  // transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
                >
                  {EMAIL} →
                </motion.h4>
              </EmailBlock>
            </NavFooter>
          )}
        </AnimatePresence>
      </StyledMobileNav>
    </>
  );
}

export default MobileNav;
