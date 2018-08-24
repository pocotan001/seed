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

type ICheckBoxStyleProps = IMarginProps;

interface ICheckBoxProps
  extends IFieldRenderProps<IInputAttributes>,
    ICheckBoxStyleProps {}

const CheckBox = styled<ICheckBoxProps>(
  ({ input, meta, className, children, m, mt, mr, mb, ml, ...rest }) => (
    <label className={className}>
      <Input
        {...input}
        {...rest}
        aria-invalid={Boolean(meta.touched && meta.error)}
      />
      {children && <Label>{children}</Label>}
    </label>
  )
)`
  display: inline-block;
  vertical-align: middle;
  ${margin};
`;

const AdaptedCheckBox: React.SFC<
  IFieldProps<IInputAttributes> & ICheckBoxStyleProps
> = props => <Field {...props} type="checkbox" component={CheckBox} />;

export default AdaptedCheckBox;
