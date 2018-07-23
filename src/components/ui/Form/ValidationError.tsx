import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { IMarginProps } from "~/components/styles/extends/margin";
import Paragraph from "../Paragraph";

interface IValidationErrorProps extends IMarginProps {
  name: string;
}

const render = ({
  meta: { touched, error },
  m,
  mt,
  mr,
  mb,
  ml
}: FieldRenderProps & IMarginProps) =>
  touched && error ? (
    <Paragraph
      fz={14}
      c="pink500"
      m={m}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      role="alert"
    >
      {error}
    </Paragraph>
  ) : null;

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
