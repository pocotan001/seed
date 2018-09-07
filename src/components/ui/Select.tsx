import * as React from "react";
import { Field, FieldProps, FieldRenderProps } from "./Field";
import { TextField, TextFieldStyleProps } from "./TextField";

type SelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

interface SelectProps
  extends FieldRenderProps<SelectAttributes>,
    TextFieldStyleProps {
  type?: "select";
}

const Select = TextField.withComponent<SelectProps>(
  ({ input, meta, children, m, mt, mr, mb, ml, type, ...rest }) => {
    const isInvalid = Boolean(meta.touched && meta.error);

    if (rest.multiple) {
      input.value = input.value || [];
      rest.size = Array.isArray(children) ? children.length : 1;
    }

    return (
      <select {...input} {...rest} aria-invalid={isInvalid}>
        {children}
      </select>
    );
  }
);

const AdaptedSelect: React.SFC<
  FieldProps<SelectAttributes> & TextFieldStyleProps
> = props => <Field {...props} type="select" component={Select as any} />;

export default AdaptedSelect;
