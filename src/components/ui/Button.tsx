import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled, { css } from "~/components/styles/themedStyledComponents";

interface IButtonProps
  extends IButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface IButtonStyleProps extends IMarginProps {
  block?: boolean;
}

const Button: React.SFC<IButtonProps> = ({
  children,
  block,
  m,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => <button {...rest}>{children}</button>;

Button.defaultProps = {
  type: "button"
};

export const buttonStyles = css<IButtonStyleProps>`
  font-size: 1rem;
  line-height: normal;
  display: ${({ block }) => (block ? "flex" : "inline-flex")};
  padding: 0.45em 0.75em;
  ${({ block }) => block && "width: 100%"};
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.grey800};
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${({ theme }) => theme.colors.grey400};
  }

  ${margin};
`;

export default styled(Button)`
  ${buttonStyles};
`;
