import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { colors } from "~/components/styles/theme";

export interface IButtonStyleProps extends IMarginProps {
  block?: boolean;
}

interface IButtonProps
  extends IButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = styled<IButtonProps>(({ block, m, mt, mr, mb, ml, ...rest }) => (
  <button {...rest} />
))`
  font-size: 1rem;
  line-height: normal;
  display: ${({ block }) => (block ? "flex" : "inline-flex")};
  padding: 0.45em 0.75em;
  ${({ block }) => block && "width: 100%"};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  color: ${colors.grey800};
  border: 1px solid ${colors.grey400};
  border-radius: 3px;
  background: ${colors.white};
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${colors.grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${colors.grey400};
  }

  ${margin};
`;

Button.defaultProps = {
  type: "button"
};

export default Button;
