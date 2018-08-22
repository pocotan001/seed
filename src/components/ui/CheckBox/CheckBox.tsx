import * as React from "react";
import styled from "styled-components";
import margin, { IMarginProps } from "~/components/styles/extends/margin";
import { Field, IFieldProps, IFieldRenderProps } from "../Field";
import Input from "./Input";
import Label from "./Label";

type IInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

interface IAdditionalProps extends IMarginProps {
  children?: React.ReactNode;
}

const CheckBox: React.SFC<
  IFieldRenderProps<IInputAttributes> & IAdditionalProps
> = ({ input, meta, className, children, m, mt, mr, mb, ml, ...rest }) => {
  const isInvalid = Boolean(meta.touched && meta.error);

  return (
    <label className={className}>
      <Input {...input} {...rest} aria-invalid={isInvalid} />
      {children && <Label>{children}</Label>}
    </label>
  );
};

const StyledCheckBox = styled(CheckBox)`
  display: inline-block;
  vertical-align: middle;
  ${margin};
`;

const AdaptedCheckBox: React.SFC<
  IFieldProps<IInputAttributes> & IAdditionalProps
> = props => <Field {...props} type="checkbox" component={StyledCheckBox} />;

export default AdaptedCheckBox;
