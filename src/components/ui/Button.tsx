import * as React from "react";
import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Color } from "~/components/styles/theme";

export interface ButtonStyleProps extends MarginProps {
  block?: boolean;
}

interface ButtonProps
  extends ButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = styled<ButtonProps>(({ block, m, mt, mr, mb, ml, ...rest }) => (
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
  color: ${Color.Grey800};
  border: 1px solid ${Color.Grey400};
  border-radius: 3px;
  background: ${Color.White};
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${Color.Grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${Color.Grey400};
  }

  ${withMargin};
`;

Button.defaultProps = {
  type: "button"
};

export default Button;
