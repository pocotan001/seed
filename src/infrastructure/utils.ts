export const sleep = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

export const serializeParams = (params: { [key: string]: any }): string => {
  const sorted = Object.keys(params)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: params[key]
      }),
      Object.create(null)
    );

  return JSON.stringify(sorted);
};

export const px = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

export const em = (value: number | string, base = 16): string =>
  typeof value === "number" ? `${value / base}em` : value;
