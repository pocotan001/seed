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

interface AlignerProps
  extends AlignerStyleProps,
    MediaProps<AlignerStyleProps>,
    MarginProps {
  children: React.ReactNode;
}

interface AlignerStyleProps {
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
}

const styles: StyleFactory<AlignerStyleProps> = ({
  direction,
  justify,
  align,
  width,
  height
}) => css`
  ${direction && `flex-direction: ${direction}`};
  ${justify && `justify-content: ${justify}`};
  ${align && `align-items: ${align}`};
  ${width && `width: ${px(width)}`};
  ${height && `height: ${px(height)}`};
`;

const Aligner = styled<AlignerProps, "div">("div")`
  display: flex;
  flex-wrap: wrap;
  ${styles};
  ${withMedia(styles)};
  ${withMargin};
`;

export default Aligner;
