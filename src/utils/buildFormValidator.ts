import { Validator } from "~/domain/Validator";

export type FormValidator = (value: string) => undefined | string;

/**
 * Create a final-form validator
 *
 * @example
 * const required = buildFormValidator(isRequired, "This field is required");
 *
 * <Field validate={required}>
 *   ...
 */
const buildFormValidator = (
  validator: Validator,
  error: string
): FormValidator => value => (validator(value) ? undefined : error);

export default buildFormValidator;
