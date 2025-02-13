import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Brown */
  &, &.light-mode {// "&," -  works with no class as well

  --color-brand-100: #FCFCF0;
  --color-brand-200: #FEF7DB;
  --color-brand-400: #d6be9ed9;
  --color-brand-500: #CEC5B5;
  --color-brand-600: #CEC5B5;
  --color-brand-700: #b5957b;
  --color-brand-800: #A6764F;
  --color-brand-900: #875d3b;

  --color-grey-300: #d1d5db;
  --color-grey-700: #a0a0a1;
  --color-grey-800: #87878c;
  --color-green-700: #b7dab7;
  --color-orange-700: #f7bf8f;
  --color-white-700: #ffffff;
  --color-yellow-700: #f2f689;
  --color-brown-700: #A6764F;
  --color-black-700: #402510;
  --color-black-600: #432610;
  --color-cream-700: #CFB494;
  
  --color-grey-700: #cfd0c6;
  --color-blue-700: #c0eff8;
  --color-blue-900: #1467a6;
  --color-red-700: #f4b9b1;
  --color-red-800: #c21111;
  --color-red-900: #a21c1c;

  --color-black-800: #402510;
  --color-black-900: #2B190B;
  
  --backdrop-color: rgba(255, 255, 255, 0.1);
  
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  
  --margin-top-sm: 2rem;

  --image-grayscale: 0;
  --image-opacity: 100%;
  }
  &.dark-mode {
    --color-brand-100: #110c09;
    --color-brand-200: #1d1109;
    --color-black-800: #402510;
    --color-brand-800: #A6764F;
    --color-brand-800: #2B190B;
    --color-brand-900: #eee2d9;
    --color-black-900: #FEF7DB;
    --color-black-700: #eee2d9;
    --color-black-600: #e1a97e;
    --color-red-800: #ffd8d8;
    --color-brand-400: #875d3b;
    --color-brand-700: #e1c6b1;
    --color-green-700: #153c15;
    --color-blue-700: #143b42;
    --color-grey-300:#4e535b;
    --color-white-700: #FEF7DB; 
    --image-grayscale: 10%;//to be less bright on dark side
    --image-opacity: 90%;
}

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;
  --border-radius-xl: 15px;



}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Roboto", sans-serif;
  color: var(--color-black-900);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-300);
  color: var(--color-black-900);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-800);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
