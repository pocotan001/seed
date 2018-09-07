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

type RadioStyleProps = MarginProps;

interface RadioProps
  extends FieldRenderProps<InputAttributes>,
    RadioStyleProps {}

const Radio = styled<RadioProps>(
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

const AdaptedRadio: React.SFC<
  FieldProps<InputAttributes> & RadioStyleProps
> = props => <Field {...props} type="radio" component={Radio} />;

export default AdaptedRadio;
