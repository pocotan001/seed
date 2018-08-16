import { css } from "styled-components";
import colors, { IColorKey } from "~/components/styles/theme/colors";

export interface IColorProps {
  c?: IColorKey;
}

const color = ({ c }: IColorProps) => css`
  ${c && `color: ${colors[c]}`};
`;

export default color;
