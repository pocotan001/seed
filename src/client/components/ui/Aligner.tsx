import { CSSProperties } from "react";
import styled from "styled-components";
import margin, { MarginProps } from "../styles/extends/margin";
import { px } from "../styles/utils";

interface OwnProps {
  children: React.ReactNode;
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

type AlignerProps = OwnProps & MarginProps;

const Aligner = styled("div")<AlignerProps>`
  display: flex;
  flex-wrap: wrap;
  ${({ direction }) => direction && `flex-direction: ${direction}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${({ width }) => width && `width: ${px(width)}`};
  ${({ height }) => height && `height: ${px(height)}`};
  ${margin};
`;

export default Aligner;
