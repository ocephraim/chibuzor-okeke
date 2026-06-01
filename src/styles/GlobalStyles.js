import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  //warm theme
  --color-bg: #fff7ef;
  --color-bg-rgb:255, 247, 239;

  //text
  --color-text-800-rgb: 34, 31, 28;
  --color-text-800: #221F1C;
  --color-text-600: #4F4C4A;
  --color-text-400: #85827F;
  --color-text-25: #F2F0ED;

  //cta
  --color-accent: #4ca277;
  --color-accent2: #DFC3C3;

  //corner smoothing
  --corner-smoothing: superellipse(1);
}

/* Apply smoothing to common rounded elements */
:where(button, img, input, textarea, select, div, .smooth-corners) {
    corner-shape: var(--corner-smoothing);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: 1.4rem;
  background-color: var(--color-bg);
  color: var(--color-text-800);

  max-width: 1440px;
  margin: 0 auto;

  @media screen and (max-width: 657px) {
    font-size: 1.3rem;
  }
}

section {
  padding: 6.4rem 4.8rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;

  @media screen  and (max-width: 820px){
    padding: 4.8rem 2rem;
    gap: 1.6rem;
  }
}

`;

export default GlobalStyles;
