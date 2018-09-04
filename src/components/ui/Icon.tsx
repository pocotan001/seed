import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { Color } from "~/components/styles/theme";
import { px } from "~/utils";

interface IIconProps extends IMarginProps {
  src: string;
  size?: number | string;
  fill?: keyof typeof Color | "currentColor";
  className?: string;
}

const Icon = styled<IIconProps>(({ src, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: src }} />
))`
  display: inline-block;
  vertical-align: middle;
  width: ${({ size }) => px(size!)};
  height: ${({ size }) => px(size!)};
  fill: ${({ fill }) =>
    fill === "currentColor" ? "currentColor" : Color[fill!]};
  ${margin};
`;

Icon.defaultProps = {
  size: "1rem",
  fill: "currentColor"
};

export default Icon;
