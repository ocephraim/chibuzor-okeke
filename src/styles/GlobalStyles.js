import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  //warm theme
  --color-bg: #fff7ef;
  --color-bg-rgb:255, 247, 239;

  //text
  --color-text-800: #221F1C;
  --color-text-600: #4F4C4A;
  --color-text-400: #85827F;
  --color-text-200: #BFBBB8;
  --color-text-100: #D6D3D0;
 --color-text-50: #F2F0ED;
 --color-text-800-rgb: 34, 31, 28;
 --color-text-50-rgb: 242,240,237;

  //cta
  --color-primary-rgb: 8, 27, 17;
  --color-primary: #081b11ff;
  --color-primary: #4ca277;
  --color-primary-100: #DAF3E7;
  --color-accent: #F8DED6;
  --color-accent-rgb: 248, 222, 214;

  //corner smoothing
  --corner-smoothing: superellipse(1);
}

/* Apply smoothing to common rounded elements */
:where(button, img, input, textarea, select, div, .smooth-corners) {
    corner-shape: var(--corner-smoothing);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
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
  scrollbar-width: thin;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  /* font-family: "PT Serif", serif; */
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
