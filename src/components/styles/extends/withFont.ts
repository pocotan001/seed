import { CSSProperties } from "react";
import { css } from "styled-components";
import { px } from "~/utils";

export interface FontProps {
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
}

const withFont = ({ fz, fw }: FontProps) => css`
  ${fz && `font-size: ${px(fz)}`};
  ${fw && `font-weight: ${fw}`};
`;

export default withFont;
