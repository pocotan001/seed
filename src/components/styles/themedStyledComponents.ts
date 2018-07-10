import * as styledComponents from "styled-components";
import { ITheme } from "~/components/styles/theme";

// Re-export the styled function with our custom theme interface
// https://www.styled-components.com/docs/api#typescript
const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

export { css, injectGlobal, keyframes, ThemeProvider };
export default styled;
