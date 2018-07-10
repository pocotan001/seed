import * as React from "react";
import { IMarginProps } from "~/components/styles/extends/margin";
import { withButtonStyles } from "./Button";
import { ILinkProps, Link } from "./Link";

interface IButtonLinkProps extends ILinkProps, IMarginProps {}

const ButtonLink: React.SFC<IButtonLinkProps> = ({
  m,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => <Link {...rest} />;

export default withButtonStyles<IButtonLinkProps>(ButtonLink);
