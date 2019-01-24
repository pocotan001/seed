import { css } from "styled-components";
import { Color } from "../enums";

const base = css`
  html {
    font-family: "Lato", sans-serif;
    font-size: 16px;
    line-height: 1.5;
    box-sizing: border-box;
    color: ${Color.Grey800};
    background-color: ${Color.Grey100};
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /**
   * Suppress the focus outline on elements that cannot be accessed via keyboard
   * https://github.com/suitcss/base/blob/master/lib/base.css
   */
  [tabindex="-1"]:focus {
    outline: 0 !important;
  }
`;

export default base;
