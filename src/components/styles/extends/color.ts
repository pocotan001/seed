import { css } from "styled-components";
import { Color } from "~/components/styles/theme";

export interface IColorProps {
  c?: keyof typeof Color;
}

const color = ({ c }: IColorProps) => css`
  ${c && `color: ${Color[c]}`};
`;

export default color;
