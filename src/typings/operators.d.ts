/**
 * From T omit a set of properties K
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * Overwrite from T those types that are assignable to U
 */
type Overwrite<T, U> = Omit<T, keyof T & keyof U> & U;
