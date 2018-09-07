import * as React from "react";
import { Field, FieldProps, FieldRenderProps } from "./Field";
import { TextField, TextFieldStyleProps } from "./TextField";

type TextAreaAttributes = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface TextAreaProps
  extends FieldRenderProps<TextAreaAttributes>,
    TextFieldStyleProps {}

const TextArea = TextField.withComponent<TextAreaProps>(
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
  FieldProps<TextAreaAttributes> & TextFieldStyleProps
> = props => <Field {...props} component={TextArea as any} />;

export default AdaptedTextArea;
