import * as React from "react";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";
import { ITextFieldStyleProps, textFieldStyles } from "./TextField";

type ISelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

interface IAdditionalProps extends ITextFieldStyleProps {
  theme?: ITheme;
}

const Select: React.SFC<
  IFieldRenderProps<ISelectAttributes> & IAdditionalProps
> = ({ input, meta, children, m, mt, mr, mb, ml, ...rest }) => {
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

  &:not([multiple]):not([size]) {
    /* (font-size * line-height + padding) + border-width */
    height: calc(2.3em + 2px);
  }
`;

const AdaptedSelect: React.SFC<
  IFieldProps<ISelectAttributes> & IAdditionalProps
> = props => <Field {...props} type="select" component={StyledSelect} />;

export default AdaptedSelect;
