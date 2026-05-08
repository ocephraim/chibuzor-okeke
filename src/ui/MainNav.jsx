import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import ButtonShortcuts from "./ButtonShortcuts";
import { useCopyEmail } from "../hooks/useCopyEmail";
import { useEffect, useState } from "react";
import { useBrowserTime } from "../hooks/useBrowserTime";
import Icons from "./Icons";

const NavContainer = styled.div`
  height: 6rem;
`;

const MobileNav = styled.nav`
  width: 100%;
  height: 6rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: transparent;
  backdrop-filter: blur(10px);
  mix-blend-mode: multiply;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  @media screen and (min-width: 657px) {
    display: none;
  }
`;

const Nav = styled.nav`
  width: 100%;
  height: 6rem;
  margin: 0 auto;
  padding: 0 4.8rem;

  background: transparent;
  backdrop-filter: blur(10px);

  /* background: ${(props) =>
    props.$isScrolled
      ? "linear-gradient(to bottom, rgba(var(--color-bg-rgb), 0.5) 20%, transparent 80%)"
      : "transparent"}; */

  position: ${(props) => (props.$isScrolled ? "fixed" : "relative")};
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: ${(props) =>
    props.$isScrolled ? "flex-end" : "space-between"};
  align-items: center;

  transition:
    background 0.3s ease-out,
    flex 0.3s ease-out,
    position 0.3s ease-out;

  @media screen and (max-width: 820px) {
    padding: 0 2rem;
  }
  @media screen and (max-width: 657px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-weight: 600;
    text-decoration: none;
    color: var(--color-text-800);
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-end;
  min-width: 22rem;

  @media screen and (max-width: 657px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }

  span {
    @media screen and (max-width: 657px) {
      display: none;
    }
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

const maxScroll =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

function MainNav() {
  const { copied, handleCopyEmail } = useCopyEmail();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 30);
      if (window.scrollY > maxScroll - 120) setIsScrolled(false);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <NavContainer>
        <Nav $isScrolled={isScrolled}>
          {!isScrolled && (
            <div>
              <StyledNavLink to="/">Chibuzor Okeke</StyledNavLink> •{" "}
              <span>Based in Lagos, NG</span>
            </div>
          )}

          {!isScrolled && <NavClock />}

          <NavList>
            {!isScrolled && (
              <>
                <StyledNavLink to="/about">About</StyledNavLink>
                <span> • </span>
              </>
            )}
            <Button
              type="button"
              variation={isScrolled ? "primary" : "tertiary"}
              icon={<Icons type="copymail" />}
              shortcuts={<ButtonShortcuts type="copymail" />}
              onClick={handleCopyEmail}
            >
              {copied ? "Copied" : "Copy email"}
            </Button>
          </NavList>
        </Nav>

        <MobileNav>
          <StyledNavLink to="/">Chibuzor Okeke</StyledNavLink>
          <StyledNavLink to="/">• Menu</StyledNavLink>
        </MobileNav>
      </NavContainer>
    </>
  );
}

export default MainNav;
