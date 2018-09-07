import * as React from "react";
import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Color } from "~/components/styles/theme";
import { Field, FieldProps, FieldRenderProps } from "./Field";

interface InputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  // Text field should have autocomplete attribute
  // https://www.chromium.org/developers/design-documents/create-amazing-password-forms#TOC-Use-autocomplete-attributes
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values
  autoComplete: string;
}

export type TextFieldStyleProps = MarginProps;

interface TextFieldProps
  extends FieldRenderProps<InputAttributes>,
    TextFieldStyleProps {}

export const TextField = styled<TextFieldProps>(
  ({ input, meta, m, mt, mr, mb, ml, ...rest }) => (
    <input
      {...input}
      {...rest}
      aria-invalid={Boolean(meta.touched && meta.error)}
    />
  )
)`
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  padding: 0.4em 0.75em;
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

  ${withMargin};
`;

const AdaptedTextField: React.SFC<
  FieldProps<InputAttributes> & TextFieldStyleProps
> = props => <Field {...props} component={TextField as any} />;

AdaptedTextField.defaultProps = {
  type: "text"
};

export default AdaptedTextField;
