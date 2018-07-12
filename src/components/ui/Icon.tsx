import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import { px } from "~/infrastructure/utils";

interface IIconProps extends IMarginProps {
  src: string;
  width?: number | string;
  height?: number | string;
  fill?: keyof ITheme["colors"];
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
  fill: ${({ theme, fill }) => theme.colors[fill!] || "currentColor"};
  ${margin};
`;

StyledIcon.defaultProps = {
  width: "1rem",
  height: "1rem"
};

export default StyledIcon;
