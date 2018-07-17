import * as React from "react";
import { IButtonStyleProps, withButtonStyles } from "./Button";
import { ILinkProps, Link } from "./Link";

interface IButtonLinkProps extends ILinkProps, IButtonStyleProps {}

const ButtonLink: React.SFC<IButtonLinkProps> = ({
  block,
  m,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => <Link {...rest} />;

export default withButtonStyles<IButtonLinkProps>(ButtonLink);
