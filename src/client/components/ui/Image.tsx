import React from "react";
import styled from "styled-components";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import margin, { MarginProps } from "../styles/extends/margin";

interface OwnProps {
  src: string;
  lazy?: boolean;
}

type ImageProps = OwnProps &
  React.ImgHTMLAttributes<HTMLImageElement> &
  MarginProps;

const ROOT_MARGIN = "200px";
const TRANSPARENT_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const cache: Set<string> = new Set();
const isDataURI = (src: string) => src.indexOf("data:") === 0;

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  lazy,
  m,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => {
  if (!lazy || cache.has(src) || isDataURI(src)) {
    return <img src={src} {...rest} />;
  }

  const el = React.useRef(null);
  const { isIntersecting } = useIntersectionObserver(el, {
    rootMargin: ROOT_MARGIN
  });

  if (isIntersecting) {
    cache.add(src);
  }

  return (
    <img ref={el} src={isIntersecting ? src : TRANSPARENT_GIF} {...rest} />
  );
};

export default styled(Image)`
  max-width: 100%;
  vertical-align: middle;
  ${margin};
`;
