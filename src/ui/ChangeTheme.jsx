import { motion } from "motion/react";
import { useState } from "react";
import styled from "styled-components";
import { useChangeTheme } from "../contexts/ChangeThemeContext";

const themes = [
  {
    id: "warm",
    tag: "Sun Burn",
    bg_color: "#fff7ef",
    // border_color: "#D6D3D0",
    pry_color: "#4ca277",
  },
  {
    id: "cool",
    tag: "Sea Water",
    bg_color: "#F2F7F9",
    // border_color: "#D2D7D9",
    pry_color: "#E76813",
  },
  {
    id: "dark",
    tag: "Dark Knight",
    bg_color: "#1C2021",
    // border_color: "#D2D7D9",
    pry_color: "#4CA277",
  },
];

const ThemeBlock = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledThemeItem = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const OuterDiv = styled.button`
  height: 2.4rem;
  width: 2.4rem;
  /* border: 1px var(--color-border-dark) solid; */
  border: 2px
    ${(props) =>
      props.$isTheme === props.$theme.id
        ? `${props.$theme.pry_color}`
        : "var(--color-border-light)"}
    solid;
  padding: 0.1rem;
  background: none;
  outline: none;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 4.8rem;
    border-radius: 0.8rem;
    padding: 0.4rem;
  }
`;

const InnerDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$theme.bg_color};
  border: 1px var(--color-border-light) solid;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    display: none;
  }

  & span {
    display: none;
    font-size: 0.8rem;
  }

  @media screen and (max-width: 820px) {
    border-radius: 0.4rem;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between;

    & p,
    & span {
      font-size: 1.2rem;
      display: inline-block;
      font-weight: 600;
      color: var(--color-text-400);
    }
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 120%;
  left: 50%;
  background-color: var(--color-bg-dark);
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0.8rem 0.8rem;
  border-radius: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 170;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const containerVariants = {
  hidden: {},
  visible: {
    transitions: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    transitions: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

function ThemeItem({ theme }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isTheme, setTheme } = useChangeTheme();

  const isSelected = isTheme === theme.id;

  return (
    <StyledThemeItem
      variants={itemVariants}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <OuterDiv
        $isTheme={isTheme}
        $theme={theme}
        onClick={() => {
          if (!document.startViewTransition) {
            setTheme(theme.id);
            return;
          }

          document.startViewTransition(() => setTheme(theme.id));
        }}
      >
        <InnerDiv $theme={theme}>
          <p>{theme.tag}</p>
          {isSelected && <span>✔️</span>}
        </InnerDiv>
      </OuterDiv>

      {showTooltip && (
        <Tooltip
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {theme.tag}
        </Tooltip>
      )}
    </StyledThemeItem>
  );
}

function ChangeTheme() {
  return (
    <ThemeBlock
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {themes.map((theme) => (
        <ThemeItem theme={theme} key={theme.id} />
      ))}
    </ThemeBlock>
  );
}

export default ChangeTheme;
