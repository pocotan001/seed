export const cx = (...classNames: (string | undefined)[]): string =>
  classNames.filter(Boolean).join(" ");
