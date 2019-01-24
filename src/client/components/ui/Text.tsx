import styled from "styled-components";
import color, { ColorProps } from "../styles/extends/color";
import margin, { MarginProps } from "../styles/extends/margin";
import typography, { TypographyProps } from "../styles/extends/typography";

type TextProps = TypographyProps & ColorProps & MarginProps;

const Text = styled("span")<TextProps>`
  ${typography};
  ${color};
  ${margin};
`;

export default Text;
