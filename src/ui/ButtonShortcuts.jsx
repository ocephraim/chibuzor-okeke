import styled from "styled-components";

const Key = styled.span`
  font-size: 1rem;
  padding: 0.3rem 0.5rem;

  border-radius: 0.4rem;
  background-color: var(--color-primary);
  color: #ffffff;

  /* filter: drop-shadow(0 2px 1px inherit); */
  box-shadow: inset 0 -2px 0px rgba(var(--color-primary-rgb), 0.2);
`;

const KeyGroup = styled.div`
  margin: 0;
  padding: 0;
  margin-left: 0.4rem;

  display: flex;
  gap: 0.2rem;
  align-items: center;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

function CopyMailShortcuts() {
  return (
    <KeyGroup>
      <Key>⌘</Key>
      <Key>K</Key>
    </KeyGroup>
  );
}

function SendShortcuts() {
  return (
    <KeyGroup>
      <Key>⌘</Key>
      <Key>&crarr;</Key>
    </KeyGroup>
  );
}

function CloseShortcuts() {
  return (
    <KeyGroup>
      <Key>Esc</Key>
    </KeyGroup>
  );
}

function CaseStudyShortcuts() {
  return (
    <KeyGroup>
      <Key>⌘</Key>
      <Key>⇧</Key>
      <Key>Y</Key>
    </KeyGroup>
  );
}

function LiveLinkShortcuts() {
  return (
    <KeyGroup>
      <Key>⌘</Key>
      <Key>⇧</Key>
      <Key>L</Key>
    </KeyGroup>
  );
}

function ButtonShortcuts({ type }) {
  if (type === "copymail") return <CopyMailShortcuts />;
  if (type === "send") return <SendShortcuts />;
  if (type === "close") return <CloseShortcuts />;
  if (type === "casestudy") return <CaseStudyShortcuts />;
  if (type === "livelink") return <LiveLinkShortcuts />;

  return null;
}

export default ButtonShortcuts;
