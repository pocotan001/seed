import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import withField, { IFieldRenderProps } from "./withField";

interface ITextFieldStyleProps extends IMarginProps {
  theme?: ITheme;
}

interface ITextFieldProps extends IFieldRenderProps, ITextFieldStyleProps {}

const TextField: React.SFC<ITextFieldProps> = ({
  input,
  meta,
  m,
  mt,
  mr,
  mb,
  ml,
  ...rest
}) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return <input {...input} {...rest} aria-invalid={isInvalid} />;
};

const StyledTextField = styled(TextField)`
  display: block;
  padding: 0.4em 0.75em;
  width: 100%;
  max-width: 100%;
  color: ${({ theme }) => theme.colors.grey800};
  border: 1px solid ${({ theme }) => theme.colors.grey400};
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.white};
  ${margin};

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

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }

  ::-moz-placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

StyledTextField.defaultProps = {
  type: "text"
};

export default withField<ITextFieldStyleProps>(StyledTextField);
