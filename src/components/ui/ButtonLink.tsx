import * as React from "react";
import Button, { ButtonStyleProps } from "./Button";
import { Link, LinkProps } from "./Link";

interface ButtonLinkProps extends LinkProps, ButtonStyleProps {}

const ButtonLink = Button.withComponent<ButtonLinkProps>(
  ({ type, block, m, mt, mr, mb, ml, ...rest }) => <Link {...rest} />
);

export default ButtonLink;
