/**
 * From U overwrite properties to T
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;
