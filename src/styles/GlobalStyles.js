import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  //corner smoothing
  --corner-smoothing: superellipse(1);

  //theme transitions
  transition: 
    background-color 0.4s ease, 
    color 0.3s ease, 
    border-color 0.3s ease;

  &, &.warm-mode {
    //warm theme
    --color-bg-light: #fff7ef;
    --color-bg-light-rgb: 255, 247, 239;
    --color-bg-dark: #221F1C;
    --color-white: #ffffff;
    --color-white-rgb: 255, 255, 255;


    //text
    --color-text-800: #221F1C;
    --color-text-600: #4F4C4A;
    --color-text-400: #706D6B;
    --color-text-200: #BFBBB8;
    --color-text-100: #D6D3D0;
    --color-text-50: #F2F0ED;
    --color-text-800-rgb: 34, 31, 28;
    --color-text-50-rgb: 242, 240, 237;
    --color-text-light:#F2F0ED;
    --color-text-dark:#221F1C;

    //borders
    --color-border-dark: #D6D3D0;
    --color-border-light: #F2F0ED;

    //cta
    --color-primary-rgb: 76, 162, 119;
    --color-primary: #4ca277;
    --color-primary-100: #DAF3E7;
    --color-accent: #F8DED6;
    --color-accent-rgb: 248, 222, 214;
  }

  &.cool-mode {
    //cool theme
    --color-bg-light: #F2F7F9;
    --color-bg-light-rgb: 242, 247, 249;
    --color-bg-dark: #1C2021;
    --color-white: #ffffff;
    --color-white-rgb: 255, 255, 255;

    //text
    --color-text-800: #1C2021;
    --color-text-600: #464B4D;
    --color-text-400: #606769;
    --color-text-200: #B2B6B8;
    --color-text-100: #D2D7D9;
    --color-text-50: #EDF1F2;
    --color-text-800-rgb: 28, 32, 33;
    --color-text-50-rgb: 237, 241, 242;
    --color-text-light:#EDF1F2;
    --color-text-dark: #1C2021;

    //borders
    --color-border-dark: #D2D7D9;
    --color-border-light: #EDF1F2;

    //cta
    --color-primary-rgb: 231, 104, 19;
    --color-primary: #E76813;
    --color-primary-100: #DAF3E7;
    --color-accent: #D7D5F7;
    --color-accent-rgb: 215, 213, 247;
  }

  &.dark-mode {
    //dark theme
    --color-bg-light: #1C2021;
    --color-bg-light-rgb: 28, 32, 33;
    --color-bg-dark: #151617;
    --color-white: #303436;
    --color-white-rgb: 48, 52, 54;

    //text
    --color-text-800: #EDF1F2;
    --color-text-600: #B2B6B8;
    --color-text-400: #959A9C; //text/500 on figma
    --color-text-200: #464B4D;
    --color-text-100: #303436;
    --color-text-50: #1C2021;
    --color-text-800-rgb: 237, 241, 242;
    --color-text-50-rgb: 28, 32, 33;
    --color-text-light:#EDF1F2;
    --color-text-dark:#1C2021 ;
    

    //borders
    --color-border-dark: #303436;
    --color-border-light: #464B4D;

    //cta
    --color-primary-rgb: 76, 162, 119;
    --color-primary: #4CA277;
    --color-primary-100: #B6E3CC;
    --color-accent: #454088;
    --color-accent-rgb: 69, 64, 136;
  }
}

::view-transition-old(root){
  animation: 300ms ease-out fade-out;
}
::view-transition-new(root){
  animation: 300ms ease-in fade-in;
}

@keyframes fade-out {
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
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
  background-color: var(--color-bg-light);
  color: var(--color-text-800);

  max-width: 1440px;
  margin: 0 auto;

  @media screen and (max-width: 657px) {
    font-size: 1.3rem;
  }

  &::selection {
    background-color: var(--color-accent);
    color: var(--color-text-800);
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

/* a:hover {
  color: var(--color-primary);
  transition: color 0.4s ease-out;
} */

`;

export default GlobalStyles;
