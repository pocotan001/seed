import * as React from "react";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { ITheme } from "~/components/styles/theme";
import styled from "~/components/styles/themedStyledComponents";
import { Field, IFieldProps, IFieldRenderProps } from "./Field";

type IInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

interface IAdditionalProps extends IMarginProps {
  children?: React.ReactNode;
  theme?: ITheme;
}

const CheckBox: React.SFC<
  IFieldRenderProps<IInputAttributes> & IAdditionalProps
> = ({ input, meta, className, children, m, mt, mr, mb, ml, ...rest }) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return (
    <label className={className}>
      <input {...input} {...rest} aria-invalid={isInvalid} />
      {children && <span className="label">{children}</span>}
    </label>
  );
};

const StyledCheckBox = styled(CheckBox)`
  display: inline-block;
  vertical-align: middle;
  ${margin};

  > input {
    vertical-align: middle;
    margin-right: 8px;
  }

  > .label {
    vertical-align: middle;
  }
`;

const AdaptedCheckBox: React.SFC<
  IFieldProps<IInputAttributes> & IAdditionalProps
> = props => <Field {...props} type="checkbox" component={StyledCheckBox} />;

export default AdaptedCheckBox;
