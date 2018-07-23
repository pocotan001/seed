export type IValidator = (value: string) => boolean;

// As per the HTML5 specification
// https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html#input.email.attrs.value.single
const reEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isRequired: IValidator = value => Boolean(value);

export const isNumeric: IValidator = value => !isNaN(Number(value));

export const isLength = ({
  min = 0,
  max = Infinity
} = {}): IValidator => value => value.length >= min && value.length <= max;

export const isEmail: IValidator = value => reEmail.test(value);

export const isDataUri: IValidator = value => value.indexOf("data:") === 0;
