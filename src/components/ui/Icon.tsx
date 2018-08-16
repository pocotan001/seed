import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import colors, { IColorKey } from "~/components/styles/theme/colors";
import { px } from "~/utils";

interface IIconProps extends IMarginProps {
  src: string;
  width?: number | string;
  height?: number | string;
  fill?: IColorKey;
  className?: string;
}

const Icon: React.SFC<IIconProps> = ({ src, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: src }} />
);

const StyledIcon = styled(Icon)`
  display: inline-block;
  vertical-align: middle;
  width: ${({ width }) => px(width!)};
  height: ${({ height }) => px(height!)};
  fill: ${({ fill }) => colors[fill!] || "currentColor"};
  ${margin};
`;

StyledIcon.defaultProps = {
  width: "1rem",
  height: "1rem"
};

export default StyledIcon;
