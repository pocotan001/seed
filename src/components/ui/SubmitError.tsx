import { FORM_ERROR } from "final-form";
import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { IMarginProps } from "~/components/styles/extends/margin";
import { ErrorMessage } from "~/components/ui";

type ISubmitErrorStyleProps = IMarginProps;
type ISubmitErrorProps = ISubmitErrorStyleProps;

const render = ({
  input,
  meta: { submitError },
  ...rest
}: FieldRenderProps & ISubmitErrorStyleProps) =>
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
const SubmitError: React.SFC<ISubmitErrorProps> = props => (
  <Field
    {...props}
    name={FORM_ERROR}
    subscription={{ submitError: true }}
    render={render}
  />
);

export default SubmitError;
