import { css } from "styled-components";
import { Color } from "../enums";

export interface ColorProps {
  c?: Color;
}

const color = ({ c }: ColorProps) => css`
  ${c && `color: ${c}`};
`;

export default color;
