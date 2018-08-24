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

type IRadioStyleProps = IMarginProps;

interface IRadioProps
  extends IFieldRenderProps<IInputAttributes>,
    IRadioStyleProps {}

const Radio = styled<IRadioProps>(
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

const AdaptedRadio: React.SFC<
  IFieldProps<IInputAttributes> & IRadioStyleProps
> = props => <Field {...props} type="radio" component={Radio} />;

export default AdaptedRadio;
