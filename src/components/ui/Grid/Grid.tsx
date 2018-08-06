import { CSSProperties } from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";
import { px } from "~/infra/utils";

interface IGridProps extends IMarginProps {
  children: React.ReactNode;
  cols?: number | CSSProperties["gridTemplateColumns"];
  rows?: number | CSSProperties["gridTemplateRows"];
  flow?: CSSProperties["gridAutoFlow"];
  gap?: CSSProperties["gridGap"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignContent"];
}

const getColumns = (v: number | string) =>
  typeof v === "number" ? `repeat(${v}, 1fr)` : v;
const getRows = getColumns;

const Grid = styled<IGridProps, "div">("div")`
  display: grid;
  ${({ cols }) => cols && `grid-template-columns: ${getColumns(cols)}`};
  ${({ rows }) => rows && `grid-template-rows: ${getRows(rows)}`};
  ${({ flow }) => flow && `grid-auto-flow: ${flow}`};
  ${({ gap }) => gap && `grid-gap: ${px(gap)}`};
  ${({ justify }) => justify && `justify-content: ${justify}`};
  ${({ align }) => align && `align-content: ${align}`};
  ${margin};
`;

Grid.defaultProps = {
  cols: 12,
  gap: 24
};

export default Grid;
