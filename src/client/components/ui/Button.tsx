import styled from "styled-components";
import { Color } from "../styles/enums";
import margin, { MarginProps } from "../styles/extends/margin";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MarginProps;

const Button = styled("button")<ButtonProps>`
  display: inline-flex;
  font-size: 1rem;
  line-height: 1.75;
  padding: 4px 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  color: ${Color.Grey800};
  border: 1px solid ${Color.Grey400};
  border-radius: 4px;
  background: transparent;
  align-items: center;
  justify-content: center;
  transition: background-color 300ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  ${margin};
`;

Button.defaultProps = {
  type: "button"
};

export default Button;
