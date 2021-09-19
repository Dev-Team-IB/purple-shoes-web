import { normalize } from 'styled-normalize';
import { createGlobalStyle } from "styled-components";

/**
 * styled-normalize were used to match style compatibility between browsers.
 * https://www.npmjs.com/package/styled-normalize
 * https://styled-components.com/
 */
const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  html,
  body {
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;