import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { MarginProps } from "~/components/styles/extends/withMargin";
import { ErrorMessage } from "~/components/ui";

type ValidationErrorStyleProps = MarginProps;

interface ValidationErrorProps extends ValidationErrorStyleProps {
  name: string;
}

const render = ({
  input,
  meta: { touched, error },
  ...rest
}: FieldRenderProps & ValidationErrorStyleProps) =>
  touched && error ? <ErrorMessage {...rest}>{error}</ErrorMessage> : null;

/**
 * Validation error the named field
 *
 * @example
 * <TextField name="email" validate={required} />
 * <ValidationError name="email" />
 */
const ValidationError: React.SFC<ValidationErrorProps> = props => (
  <Field
    {...props}
    subscription={{ touched: true, error: true }}
    render={render}
  />
);

export default ValidationError;
