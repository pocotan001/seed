import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { colors } from "~/components/styles/theme";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";

interface IInputAttributes extends React.InputHTMLAttributes<HTMLInputElement> {
  // Text field should have autocomplete attribute
  // https://www.chromium.org/developers/design-documents/create-amazing-password-forms#TOC-Use-autocomplete-attributes
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values
  autoComplete: string;
}

export type ITextFieldStyleProps = IMarginProps;

interface ITextFieldProps
  extends IFieldRenderProps<IInputAttributes>,
    ITextFieldStyleProps {}

export const TextField = styled<ITextFieldProps>(
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
  color: ${colors.grey800};
  border: 1px solid ${colors.grey400};
  border-radius: 3px;
  background: ${colors.white};

  &:hover {
    border-color: ${colors.grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${colors.grey400};
  }

  &[aria-invalid="true"] {
    border-color: ${colors.pink500};
  }

  &::-webkit-input-placeholder {
    color: ${colors.grey400};
  }

  &::-moz-placeholder {
    color: ${colors.grey400};
  }

  ${margin};
`;

const AdaptedTextField: React.SFC<
  IFieldProps<IInputAttributes> & ITextFieldStyleProps
> = props => <Field {...props} component={TextField as any} />;

AdaptedTextField.defaultProps = {
  type: "text"
};

export default AdaptedTextField;
