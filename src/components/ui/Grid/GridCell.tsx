import { CSSProperties } from "react";
import styled from "~/components/styles/themedStyledComponents";

interface IGridCellProps {
  children: React.ReactNode;
  col?: number;
  row?: number;
  justify?: CSSProperties["justifySelf"];
  align?: CSSProperties["alignSelf"];
}

const GridCell = styled<IGridCellProps, "div">("div")`
  ${({ col }) => col && `grid-column-end: span ${col}`};
  ${({ row }) => row && `grid-row-end: span ${row}`};
  ${({ justify }) => justify && `justify-self: ${justify}`};
  ${({ align }) => align && `align-self: ${align}`};
`;

GridCell.defaultProps = {
  col: 1
};

export default GridCell;
