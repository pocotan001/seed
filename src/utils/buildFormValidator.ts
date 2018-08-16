import { IValidator } from "~/domain/validators";

export type IFormValidator = (value: string) => undefined | string;

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
  validator: IValidator,
  error: string
): IFormValidator => value => (validator(value) ? undefined : error);

export default buildFormValidator;
