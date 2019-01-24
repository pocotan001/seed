const prettyTime = (ms: number): string => {
  if (String(ms).length < 4) {
    return `${ms}ms`;
  }

  return `${Math.trunc(ms / 1000)}s`;
};

export default prettyTime;
