/**
 * Merge two types into a new type
 */
export type Merge<T, U> = Omit<T, keyof U> & U;
