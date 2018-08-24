import * as React from "react";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";
import { ITextFieldStyleProps, TextField } from "./TextField";

type ITextAreaAttributes = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface ITextAreaProps
  extends IFieldRenderProps<ITextAreaAttributes>,
    ITextFieldStyleProps {}

const TextArea = TextField.withComponent<ITextAreaProps>(
  ({ input, meta, m, mt, mr, mb, ml, ...rest }) => (
    <textarea
      {...input}
      {...rest}
      aria-invalid={Boolean(meta.touched && meta.error)}
    />
  )
).extend`
  resize: vertical;
`;

const AdaptedTextArea: React.SFC<
  IFieldProps<ITextAreaAttributes> & ITextFieldStyleProps
> = props => <Field {...props} component={TextArea as any} />;

export default AdaptedTextArea;
