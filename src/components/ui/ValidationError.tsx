import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { IMarginProps } from "~/components/styles/extends/margin";
import { ErrorMessage } from "~/components/ui";

type IValidationErrorStyleProps = IMarginProps;

interface IValidationErrorProps extends IValidationErrorStyleProps {
  name: string;
}

const render = ({
  input,
  meta: { touched, error },
  ...rest
}: FieldRenderProps & IValidationErrorStyleProps) =>
  touched && error ? <ErrorMessage {...rest}>{error}</ErrorMessage> : null;

/**
 * Validation error the named field
 *
 * @example
 * <TextField name="email" validate={required} />
 * <ValidationError name="email" />
 */
const ValidationError: React.SFC<IValidationErrorProps> = props => (
  <Field
    {...props}
    subscription={{ touched: true, error: true }}
    render={render}
  />
);

export default ValidationError;
