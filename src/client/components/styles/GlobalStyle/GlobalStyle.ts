import { createGlobalStyle } from "styled-components";
import base from "./base";
import normalize from "./normalize";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
  ${normalize};
  ${reset};
  ${base};
`;

export default GlobalStyle;
