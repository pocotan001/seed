import * as React from "react";
import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { isDataUri } from "~/domain/validators";
import Observer from "./Observer";

interface ImageProps
  extends MarginProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

// Transparent GIF
const PLACEHOLDER_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const ROOT_MARGIN = "200px";

const cache: Set<string> = new Set();

const Image = styled<ImageProps>(
  ({ src, m, mt, mr, mb, ml, ...rest }) =>
    cache.has(src) || isDataUri(src) ? (
      <img src={src} {...rest} />
    ) : (
      // Lazy load
      <Observer rootMargin={ROOT_MARGIN} once>
        {isIntersecting => {
          if (isIntersecting) {
            cache.add(src);
          }

          return <img src={isIntersecting ? src : PLACEHOLDER_SRC} {...rest} />;
        }}
      </Observer>
    )
)`
  max-width: 100%;
  vertical-align: middle;
  ${withMargin};
`;

Image.defaultProps = {
  alt: ""
};

export default Image;
