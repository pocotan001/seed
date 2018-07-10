import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";
import { isDataUri } from "~/infrastructure/utils";
import Observer from "./Observer";

interface IImageProps
  extends IMarginProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

// Transparent GIF
const PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const ROOT_MARGIN = "300px";

const Image: React.SFC<IImageProps> = ({ src, m, mt, mr, mb, ml, ...rest }) =>
  isDataUri(src) ? (
    <img src={src} {...rest} />
  ) : (
    // Lazy load
    <Observer rootMargin={ROOT_MARGIN} once>
      {isIntersecting => (
        <img src={isIntersecting ? src : PLACEHOLDER_SRC} {...rest} />
      )}
    </Observer>
  );

Image.defaultProps = {
  alt: ""
};

export default styled(Image)`
  max-width: 100%;
  vertical-align: middle;
  ${margin};
`;
