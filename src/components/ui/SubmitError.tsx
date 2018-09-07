import { FORM_ERROR } from "final-form";
import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { MarginProps } from "~/components/styles/extends/withMargin";
import { ErrorMessage } from "~/components/ui";

type SubmitErrorStyleProps = MarginProps;
type SubmitErrorProps = SubmitErrorStyleProps;

const render = ({
  input,
  meta: { submitError },
  ...rest
}: FieldRenderProps & SubmitErrorStyleProps) =>
  submitError ? <ErrorMessage {...rest}>{submitError}</ErrorMessage> : null;

/**
 * The whole-form submission error returned by `onSubmit` under the `FORM_ERROR` key
 *
 * @example
 * const handleSubmit = () => "Failed";
 *
 * <Form onSubmit={handleSubmit}>
 *   <SubmitError />
 * </Form>
 */
const SubmitError: React.SFC<SubmitErrorProps> = props => (
  <Field
    {...props}
    name={FORM_ERROR}
    subscription={{ submitError: true }}
    render={render}
  />
);

export default SubmitError;
