import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { ITheme } from "~/components/styles/theme";
import styled, { css } from "~/components/styles/themedStyledComponents";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";

type IInputAttributes = React.InputHTMLAttributes<HTMLInputElement>;
export type ITextFieldStyleProps = IMarginProps;

interface IAdditionalProps extends ITextFieldStyleProps {
  theme?: ITheme;
}

const TextField: React.SFC<
  IFieldRenderProps<IInputAttributes> & IAdditionalProps
> = ({ input, meta, m, mt, mr, mb, ml, ...rest }) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return <input {...input} {...rest} aria-invalid={isInvalid} />;
};

export const textFieldStyles = css<ITextFieldStyleProps>`
  font-size: 1rem;
  line-height: 1.5;
  display: block;
  padding: 0.4em 0.75em;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.grey800};
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    border-color: ${({ theme }) => theme.colors.grey500};
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
    border-color: ${({ theme }) => theme.colors.grey400};
  }

  &[aria-invalid="true"] {
    border-color: ${({ theme }) => theme.colors.pink500};
  }

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }

  &::-moz-placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }

  ${margin};
`;

const StyledTextField = styled(TextField)`
  ${textFieldStyles};
`;

const AdaptedTextField: React.SFC<
  IFieldProps<IInputAttributes> & IAdditionalProps
> = props => <Field {...props} component={StyledTextField} />;

AdaptedTextField.defaultProps = {
  type: "text"
};

export default AdaptedTextField;
