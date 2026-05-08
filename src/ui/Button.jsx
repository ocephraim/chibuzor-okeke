import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-accent);
    color: #fff;
    padding: 1.2rem;

    & span {
      background-color: var(--color-text-800);
      mix-blend-mode: screen;
      color: #fff;
    }
  `,

  secondary: css`
    background-color: var(--color-text-800);
    mix-blend-mode: color-dodge;
    color: #fff;
    padding: 1.2rem;

    & span {
      background-color: var(--color-text-800);
      mix-blend-mode: screen;
      color: #fff;
    }
  `,

  tertiary: css`
    background-color: transparent;
    color: var(--color-text-800);
    padding: 0;
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  border-radius: 1.2rem;
  border: none;

  font-weight: 600;
  color: var(--color-text-800);

  cursor: pointer;
  transition: all 0.3s ease-out;

  & svg {
    fill: currentColor;
  }

  ${(props) => variations[props.variation]}
`;

function Button({ variation = "primary", icon, children, shortcuts, onClick }) {
  return (
    <StyledButton onClick={onClick} variation={variation}>
      {icon} {children} {shortcuts}
    </StyledButton>
  );
}

export default Button;
