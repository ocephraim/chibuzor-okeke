import styled from "styled-components";

const Key = styled.span`
  font-size: 1rem;
  padding: 0.3rem 0.5rem;

  border-radius: 0.4rem;
  background-color: var(--color-accent);
  color: #fff;
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

function ButtonShortcuts({ type }) {
  if (type === "copymail") return <CopyMailShortcuts />;

  if (type === "send") return <SendShortcuts />;

  return null;
}

export default ButtonShortcuts;
