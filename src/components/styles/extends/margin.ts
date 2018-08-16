import { CSSProperties } from "react";
import { css } from "styled-components";
import { px } from "~/utils";

export interface IMarginProps {
  m?: CSSProperties["margin"];
  mt?: CSSProperties["marginTop"];
  mr?: CSSProperties["marginRight"];
  mb?: CSSProperties["marginBottom"];
  ml?: CSSProperties["marginLeft"];
}

const margin = ({ m, mt, mr, mb, ml }: IMarginProps) => css`
  ${m && `margin: ${px(m)}`};
  ${mt && `margin-top: ${px(mt)}`};
  ${mr && `margin-right: ${px(mr)}`};
  ${mb && `margin-bottom: ${px(mb)}`};
  ${ml && `margin-left: ${px(ml)}`};
`;

export default margin;
