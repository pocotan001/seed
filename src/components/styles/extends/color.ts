import theme, { ITheme } from "~/components/styles/theme";
import { css } from "~/components/styles/themedStyledComponents";

export interface IColorProps {
  c?: keyof ITheme["colors"];
}

const color = ({ c }: IColorProps) => css`
  ${c && `color: ${theme.colors[c]}`};
`;

export default color;
