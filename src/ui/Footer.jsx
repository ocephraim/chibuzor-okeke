import styled from "styled-components";
import Icons from "./Icons";

const StyledFooter = styled.footer`
  overflow: hidden;
  background-color: var(--color-text-800);
  color: var(--color-text-25);
  font-weight: 500;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  svg {
    width: 100%;
    height: auto;
    margin-bottom: -2rem;

    @media screen and (max-width: 657px) {
      margin-bottom: -0.5rem;
    }
  }
`;

const FooterInfo = styled.section`
  padding-bottom: 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media screen and (max-width: 657px) {
    justify-content: center;
    gap: 1.2rem;
  }

  ul {
    display: flex;
    gap: 0.4rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterInfo>
        <p>© Copyright 2026</p>
        <p>🧱 This site is a Work In Progress</p>
        <ul>
          <a href="" target="_blank">
            Instagram,
          </a>
          <a href="" target="_blank">
            Twitter (X),
          </a>
          <a href="" target="_blank">
            LinkedIn
          </a>
        </ul>
      </FooterInfo>

      <Icons type="myname" />
    </StyledFooter>
  );
}

export default Footer;
