import * as React from "react";
import styled from "~/components/styles/themedStyledComponents";
import { buttonStyles, IButtonStyleProps } from "./Button";
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

export default styled(ButtonLink)`
  ${buttonStyles};
`;
