import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import media, { IMediaKey, mediaKeys } from "~/components/styles/mixins/media";

interface ICellProps
  extends ICellStyleProps,
    Partial<Record<IMediaKey, ICellStyleProps>> {
  children: React.ReactNode;
}

interface ICellStyleProps {
  col?: number;
  row?: number;
  justify?: CSSProperties["justifySelf"];
  align?: CSSProperties["alignSelf"];
  order?: CSSProperties["order"];
}

const styles = ({ col, row, justify, align, order }: ICellStyleProps) => css`
  ${col && `grid-column-end: span ${col}`};
  ${row && `grid-row-end: span ${row}`};
  ${justify && `justify-self: ${justify}`};
  ${align && `align-self: ${align}`};
  ${order && `order: ${order}`};
`;

const composeMediaStyles = (props: ICellProps) =>
  mediaKeys
    .map(key => props[key] && media[key]`${styles(props[key]!)}`)
    .filter(Boolean);

const Cell = styled<ICellProps, "div">("div")`
  ${styles};
  ${composeMediaStyles};
`;

Cell.defaultProps = {
  col: 1
};

export default Cell;
