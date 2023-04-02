/**
 * Makes the given keys optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};
