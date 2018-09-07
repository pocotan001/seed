import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import withMedia, {
  MediaProps,
  StyleFactory
} from "~/components/styles/extends/withMedia";

interface CellProps extends CellStyleProps, MediaProps<CellStyleProps> {
  children: React.ReactNode;
}

interface CellStyleProps {
  col?: number;
  row?: number;
  justify?: CSSProperties["justifySelf"];
  align?: CSSProperties["alignSelf"];
  order?: CSSProperties["order"];
}

const styles: StyleFactory<CellStyleProps> = ({
  col,
  row,
  justify,
  align,
  order
}) => css`
  ${col && `grid-column-end: span ${col}`};
  ${row && `grid-row-end: span ${row}`};
  ${justify && `justify-self: ${justify}`};
  ${align && `align-self: ${align}`};
  ${order && `order: ${order}`};
`;

const Cell = styled<CellProps, "div">("div")`
  ${styles};
  ${withMedia(styles)};
`;

Cell.defaultProps = {
  col: 1
};

export default Cell;
