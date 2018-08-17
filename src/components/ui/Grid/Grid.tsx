import { CSSProperties } from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import media, { IMediaKey, mediaKeys } from "~/components/styles/mixins/media";
import { px } from "~/utils";

interface IGridProps
  extends IGridStyleProps,
    Partial<Record<IMediaKey, IGridStyleProps>>,
    IMarginProps {
  children: React.ReactNode;
}

interface IGridStyleProps {
  cols?: number | CSSProperties["gridTemplateColumns"];
  rows?: number | CSSProperties["gridTemplateRows"];
  flow?: CSSProperties["gridAutoFlow"];
  gap?: CSSProperties["gridGap"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignContent"];
}

const buildColumns = (v: number | string) =>
  typeof v === "number" ? `repeat(${v}, 1fr)` : v;
const buildRows = buildColumns;

const buildStyles = ({
  cols,
  rows,
  flow,
  gap,
  justify,
  align
}: IGridStyleProps) => `
  ${cols && `grid-template-columns: ${buildColumns(cols)}`};
  ${rows && `grid-template-rows: ${buildRows(rows)}`};
  ${flow && `grid-auto-flow: ${flow}`};
  ${gap && `grid-gap: ${px(gap)}`};
  ${justify && `justify-content: ${justify}`};
  ${align && `align-content: ${align}`};
`;

const composeMediaStyles = (props: IGridProps) =>
  mediaKeys
    .map(key => props[key] && media[key]`${buildStyles(props[key]!)}`)
    .filter(Boolean);

/**
 * @example
 * // Different gaps at different breakpoints
 * <Grid gap={30} tablet={{ gap: 20 }} phone={{ gap: 10 }}>
 *   ...
 * </Grid>
 */
const Grid = styled<IGridProps, "div">("div")`
  display: grid;
  ${buildStyles};
  ${composeMediaStyles};
  ${margin};
`;

Grid.defaultProps = {
  cols: 12,
  gap: 24
};

export default Grid;
