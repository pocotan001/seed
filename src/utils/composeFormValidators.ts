import { FormValidator } from "./buildFormValidator";

/**
 * @example
 * const required = buildFormValidator(isRequired, "Required");
 * const numeric = buildFormValidator(isNumeric, "Must be a number");
 * const composed = composeFormValidators(required, numeric);
 *
 * <Field validate={composed}>
 *   ...
 */
const composeFormValidators = (
  ...validators: FormValidator[]
): FormValidator => value =>
  validators.reduce<ReturnType<FormValidator>>(
    (err, validator) => err || validator(value),
    undefined
  );

export default composeFormValidators;
