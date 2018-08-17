import * as React from "react";
import styled from "styled-components";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";
import { ITextFieldStyleProps, textFieldStyles } from "./TextField";

type ISelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

interface IAdditionalProps extends ITextFieldStyleProps {
  type?: string;
}

const Select: React.SFC<
  IFieldRenderProps<ISelectAttributes> & IAdditionalProps
> = ({ input, meta, children, m, mt, mr, mb, ml, type, ...rest }) => {
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
};

const StyledSelect = styled(Select)`
  ${textFieldStyles};
`;

const AdaptedSelect: React.SFC<
  IFieldProps<ISelectAttributes> & IAdditionalProps
> = props => <Field {...props} type="select" component={StyledSelect} />;

export default AdaptedSelect;
