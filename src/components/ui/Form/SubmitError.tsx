import { FORM_ERROR } from "final-form";
import * as React from "react";
import { Field, FieldRenderProps } from "react-final-form";
import { IMarginProps } from "~/components/styles/extends/margin";
import Paragraph from "../Paragraph";

type ISubmitErrorProps = IMarginProps;

const render = ({
  meta: { submitError },
  m,
  mt,
  mr,
  mb,
  ml
}: FieldRenderProps & IMarginProps) =>
  submitError ? (
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
      {submitError}
    </Paragraph>
  ) : null;

/**
 * The whole-form submission error returned by `onSubmit` under the `FORM_ERROR` key
 *
 * @example
 * const handleSubmit = () => ({ [FORM_ERROR]: "Failed" });
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
