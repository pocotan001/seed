import { css } from "styled-components";
import { Color } from "~/components/styles/theme";

export interface ColorProps {
  c?: keyof typeof Color;
}

const withColor = ({ c }: ColorProps) => css`
  ${c && `color: ${Color[c]}`};
`;

export default withColor;
