import * as React from "react";
import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Color } from "~/components/styles/theme";
import { px } from "~/utils";

interface IconProps extends MarginProps {
  src: string;
  size?: number | string;
  fill?: keyof typeof Color | "currentColor";
  className?: string;
}

const Icon = styled<IconProps>(({ src, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: src }} />
))`
  display: inline-block;
  vertical-align: middle;
  width: ${({ size }) => px(size!)};
  height: ${({ size }) => px(size!)};
  fill: ${({ fill }) =>
    fill === "currentColor" ? "currentColor" : Color[fill!]};
  ${withMargin};
`;

Icon.defaultProps = {
  size: "1rem",
  fill: "currentColor"
};

export default Icon;
