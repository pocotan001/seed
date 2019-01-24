export type Validator = (value?: string) => boolean;

// As per the HTML5 specification
// https://www.w3.org/TR/2012/WD-html-markup-20120320/input.email.html#input.email.attrs.value.single
const reEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const isRequired: Validator = value => !!value;
export const isEmail: Validator = value => !!value && reEmail.test(value);

export const createIsLength = ({
  min = 0,
  max = Infinity
} = {}): Validator => value =>
  !!value && value.length >= min && value.length <= max;
