import * as React from "react";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";
import { ITextFieldStyleProps, textFieldStyles } from "./TextField";

type ITextAreaAttributes = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface IAdditionalProps extends ITextFieldStyleProps {
  theme?: ITheme;
}

const TextArea: React.SFC<
  IFieldRenderProps<ITextAreaAttributes> & IAdditionalProps
> = ({ input, meta, m, mt, mr, mb, ml, ...rest }) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return <textarea {...input} {...rest} aria-invalid={isInvalid} />;
};

const StyledTextArea = styled(TextArea)`
  ${textFieldStyles};
`;

const AdaptedTextArea: React.SFC<
  IFieldProps<ITextAreaAttributes> & IAdditionalProps
> = props => <Field {...props} component={StyledTextArea} />;

export default AdaptedTextArea;
