import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import styled from "~/components/styles/themedStyledComponents";

interface IButtonProps
  extends IMarginProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.SFC<IButtonProps> = ({
  children,
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

export const withButtonStyles = <P extends {}>(
  Component: React.ComponentType<P>
) => {
  const StyledComponent = styled(Component)`
    font-size: 1em;
    line-height: normal;
    display: inline-flex;
    padding: 0.4em 0.75em;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.grey700};
    border: 1px solid ${({ theme }) => theme.colors.grey400};
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.white};
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: ${({ theme }) => theme.colors.grey600};
    }

    &:disabled {
      cursor: default;
      opacity: 0.6;
      border-color: ${({ theme }) => theme.colors.grey400};
    }

    ${margin};
  `;

  StyledComponent.displayName = `withButtonStyles(${Component.displayName ||
    Component.name}`;

  return StyledComponent;
};

export default withButtonStyles<IButtonProps>(Button);
