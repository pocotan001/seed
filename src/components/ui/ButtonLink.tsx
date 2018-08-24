import * as React from "react";
import Button, { IButtonStyleProps } from "./Button";
import { ILinkProps, Link } from "./Link";

interface IButtonLinkProps extends ILinkProps, IButtonStyleProps {}

const IButtonLinkProps = Button.withComponent<IButtonLinkProps>(
  ({ type, block, m, mt, mr, mb, ml, ...rest }) => <Link {...rest} />
);

export default IButtonLinkProps;
