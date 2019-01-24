import { CSSProperties } from "react";
import styled from "styled-components";
import margin, { MarginProps } from "../../styles/extends/margin";
import { px } from "../../styles/utils";

interface OwnProps {
  children: React.ReactNode;
  inline?: boolean;
  cols?: number | CSSProperties["gridTemplateColumns"];
  rows?: number | CSSProperties["gridTemplateRows"];
  flow?: CSSProperties["gridAutoFlow"];
  gap?: CSSProperties["gridGap"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
}

type GridProps = OwnProps & MarginProps;

const buildColumns = (value: number | string) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;
const buildRows = buildColumns;

const Grid = styled("div")<GridProps>`
  display: ${({ inline }) => (inline ? "inline-grid" : "grid")};
  ${({ cols }) => cols && `grid-template-columns: ${buildColumns(cols)}`};
  ${({ rows }) => rows && `grid-template-rows: ${buildRows(rows)}`};
  ${({ flow }) => flow && `grid-auto-flow: ${flow}`};
  ${({ gap }) => gap && `grid-gap: ${px(gap)}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-items: ${align}`};
  ${margin};
`;

Grid.defaultProps = {
  cols: 12,
  gap: 24
};

export default Grid;
