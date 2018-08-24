import * as React from "react";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";
import { ITextFieldStyleProps, TextField } from "./TextField";

type ISelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

interface ISelectProps
  extends IFieldRenderProps<ISelectAttributes>,
    ITextFieldStyleProps {
  type?: "select";
}

const Select = TextField.withComponent<ISelectProps>(
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
  IFieldProps<ISelectAttributes> & ITextFieldStyleProps
> = props => <Field {...props} type="select" component={Select as any} />;

export default AdaptedSelect;
