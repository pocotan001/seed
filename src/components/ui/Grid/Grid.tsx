import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import withMedia, {
  MediaProps,
  StyleFactory
} from "~/components/styles/extends/withMedia";
import { px } from "~/utils";

interface GridProps
  extends GridStyleProps,
    MediaProps<GridStyleProps>,
    MarginProps {
  children: React.ReactNode;
}

interface GridStyleProps {
  cols?: number | CSSProperties["gridTemplateColumns"];
  rows?: number | CSSProperties["gridTemplateRows"];
  flow?: CSSProperties["gridAutoFlow"];
  gap?: CSSProperties["gridGap"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignContent"];
}

const buildColumns = (value: number | string) =>
  typeof value === "number" ? `repeat(${value}, 1fr)` : value;
const buildRows = buildColumns;

const styles: StyleFactory<GridStyleProps> = ({
  cols,
  rows,
  flow,
  gap,
  justify,
  align
}) => css`
  ${cols && `grid-template-columns: ${buildColumns(cols)}`};
  ${rows && `grid-template-rows: ${buildRows(rows)}`};
  ${flow && `grid-auto-flow: ${flow}`};
  ${gap && `grid-gap: ${px(gap)}`};
  ${justify && `justify-content: ${justify}`};
  ${align && `align-content: ${align}`};
`;

const Grid = styled<GridProps, "div">("div")`
  display: grid;
  ${styles};
  ${withMedia(styles)};
  ${withMargin};
`;

Grid.defaultProps = {
  cols: 12,
  gap: 24
};

export default Grid;
