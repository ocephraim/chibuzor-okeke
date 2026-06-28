import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import styled from "styled-components";

import { useBrowserTime } from "../hooks/useBrowserTime";
import Button from "./Button";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { RevealWords } from "./RevealText";

const StyledMobileNav = styled(motion.nav)`
  width: 100%;
  height: ${(props) => (props.$isOpen ? "100dvh" : "6rem")};
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  flex-direction: ${(props) => (props.$isOpen ? "column" : "row")};
  justify-content: space-between;
  align-items: center;

  background: ${(props) =>
    props.$isOpen
      ? "rgba(var(--color-bg-rgb), 0.8)"
      : "rgba(var(--color-bg-rgb), 0.4)"};
  backdrop-filter: blur(10px);
  /* mix-blend-mode: ${(props) => (props.$isOpen ? "none" : "multiply")}; */

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: all ease 0.5;

  @media screen and (min-width: 657px) {
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
  min-width: 22rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  span {
    @media screen and (max-width: 657px) {
      display: none;
    }
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
  }
`;

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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleOpenNav() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <StyledMobileNav
        $isOpen={isOpen}
        transition={{ ease: "easeInOut", duration: 0.5 }}
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

          {isOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5 }}
            >
              <NavList>
                <StyledNavLink to="/about" onClick={handleOpenNav}>
                  • About
                </StyledNavLink>
                <StyledNavLink to="/">• Work</StyledNavLink>
                <StyledNavLink to="/">• Lets chat</StyledNavLink>
              </NavList>
            </motion.div>
          )}
        </MenuLinks>

        {isOpen && (
          <NavFooter>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
              style={MetaInfo}
            >
              <span>Based in Lagos, NG</span>
              <NavClock />
            </motion.div>

            <EmailBlock as="a" href={`mailto:${EMAIL}`}>
              <motion.h4
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ ease: "easeOut", duration: 0.5, delay: 0.4 }}
              >
                {/* <RevealWords
                  text={`${EMAIL} →`}
                  style={{
                    textDecoration: "underline",
                    width: "100%",
                    lineHeight: "110%",
                  }}
                  delay={0.4}
                /> */}
                {EMAIL} →
              </motion.h4>
            </EmailBlock>
          </NavFooter>
        )}
      </StyledMobileNav>
    </>
  );
}

export default MobileNav;
