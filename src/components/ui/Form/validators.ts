import { IValidator } from "~/domain/validators";

type IFormValidator = (value: string) => undefined | string;

/**
 * Create a final-form validator
 *
 * @example
 * const required = createFormValidator(isRequired, "This field is required");
 *
 * <Field validate={required}>
 *   ...
 */
export const createFormValidator = (
  validator: IValidator,
  error: string
): IFormValidator => value => (validator(value) ? undefined : error);

/**
 * @example
 * const required = createFormValidator(isRequired, "Required");
 * const numeric = createFormValidator(isNumeric, "Must be a number");
 * const composed = composeFormValidators(required, numeric);
 *
 * <Field validate={composed}>
 *   ...
 */
export const composeFormValidators = (
  ...validators: IFormValidator[]
): IFormValidator => value =>
  validators.reduce<ReturnType<IFormValidator>>(
    (error, validator) => error || validator(value),
    undefined
  );
