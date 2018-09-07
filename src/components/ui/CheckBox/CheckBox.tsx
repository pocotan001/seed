import * as React from "react";
import styled from "styled-components";
import withMargin, {
  MarginProps
} from "~/components/styles/extends/withMargin";
import { Field, FieldProps, FieldRenderProps } from "../Field";
import Input from "./Input";
import Label from "./Label";

type InputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

type CheckBoxStyleProps = MarginProps;

interface CheckBoxProps
  extends FieldRenderProps<InputAttributes>,
    CheckBoxStyleProps {}

const CheckBox = styled<CheckBoxProps>(
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
  ${withMargin};
`;

const AdaptedCheckBox: React.SFC<
  FieldProps<InputAttributes> & CheckBoxStyleProps
> = props => <Field {...props} type="checkbox" component={CheckBox} />;

export default AdaptedCheckBox;
