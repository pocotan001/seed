const em = (value: number | string, base = 16): string =>
  typeof value === "number" ? `${value / base}em` : value;

export default em;
