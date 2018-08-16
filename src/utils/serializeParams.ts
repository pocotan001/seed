const serializeParams = (params: { [key: string]: any }): string => {
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

export default serializeParams;
