import { CSSProperties } from "react";
import { css } from "styled-components";
import { px } from "~/utils";

export interface IFontProps {
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
}

const font = ({ fz, fw }: IFontProps) => css`
  ${fz && `font-size: ${px(fz)}`};
  ${fw && `font-weight: ${fw}`};
`;

export default font;
