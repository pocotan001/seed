const px = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

export default px;
