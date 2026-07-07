import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-primary);
    color: #ffffff;
    padding: 1.2rem;

    & span {
      background-color: #221f1c;
      mix-blend-mode: screen;
      color: #ffffff;
    }
  `,

  secondary: css`
    background-color: var(--color-bg-dark);
    mix-blend-mode: color-dodge;
    color: #ffffff;
    padding: 1.2rem;

    & span {
      background-color: #221f1c;
      mix-blend-mode: screen;
      color: #ffffff;
    }
  `,

  tertiary: css`
    background-color: transparent;
    color: var(--color-text-800);
    padding: 1.2rem;

    & span {
      /* background-color: var(--color-text-800); */
      mix-blend-mode: difference;
      color: #ffffff;
    }
  `,

  icon: css`
    padding: 0.8rem;
    border-radius: 150%;
    color: var(--color-text-800);
    background-color: var(--color-text-50);
    font-size: 2.4rem;
    line-height: 100%;
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  border-radius: 1.2rem;
  border: none;
  box-shadow: none;

  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  font-weight: 600;
  color: var(--color-text-800);

  cursor: pointer;
  transition: all 0.4s ease-out;

  & svg {
    fill: currentColor;
  }

  ${(props) => variations[props.variation]}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

function Button({
  variation = "primary",
  icon,
  children,
  shortcuts,
  onClick,
  className,
  disabled = false,
  ...rest
}) {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      variation={variation}
      disabled={disabled}
      {...rest}
    >
      {icon} {children} {shortcuts}
    </StyledButton>
  );
}

export default Button;
