import styled from "styled-components";
import { Color } from "../../styles/enums";

const Input = styled("input")`
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  padding: 0.4rem 0.75rem;
  width: 100%;
  max-width: 100%;
  color: ${Color.Grey800};
  border: 1px solid ${Color.Grey400};
  border-radius: 3px;
  background: ${Color.White};

  &:hover {
    border-color: ${Color.Grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${Color.Grey400};
  }

  &[aria-invalid="true"] {
    border-color: ${Color.Pink500};
  }

  &::-webkit-input-placeholder {
    color: ${Color.Grey400};
  }

  &::-moz-placeholder {
    color: ${Color.Grey400};
  }
`;

export default Input;
