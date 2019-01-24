import { CSSProperties } from "react";
import { css } from "styled-components";
import { px } from "../utils";

export interface TypographyProps {
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
}

const typography = ({ fz, fw }: TypographyProps) => css`
  ${fz && `font-size: ${px(fz)}`};
  ${fw && `font-weight: ${fw}`};
`;

export default typography;
