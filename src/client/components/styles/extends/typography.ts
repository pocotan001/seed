import { CSSProperties } from "react";
import { css } from "styled-components";
import { px } from "../utils";

export interface TypographyProps {
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
  va?: CSSProperties["verticalAlign"];
  ta?: CSSProperties["textAlign"];
}

const typography = ({ fz, fw, va, ta }: TypographyProps) => css`
  ${fz && `font-size: ${px(fz)}`};
  ${fw && `font-weight: ${fw}`};
  ${va && `vertical-align: ${va}`};
  ${ta && `text-align: ${ta}`};
`;

export default typography;
