import { CSSProperties } from "react";
import styled from "styled-components";

interface CellProps {
  children: React.ReactNode;
  col?: number;
  row?: number;
  justify?: CSSProperties["justifySelf"];
  align?: CSSProperties["alignSelf"];
  order?: CSSProperties["order"];
}

const Cell = styled("div")<CellProps>`
  ${({ col }) => col && `grid-column-end: span ${col}`};
  ${({ row }) => row && `grid-row-end: span ${row}`};
  ${({ justify }) => justify && `justify-self: ${justify}`};
  ${({ align }) => align && `align-self: ${align}`};
  ${({ order }) => order && `order: ${order}`};
`;

Cell.defaultProps = {
  col: 1
};

export default Cell;
