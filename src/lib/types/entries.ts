/**
 * Given object's own enumerable string-keyed property [key, value] pairs
 *
 * @example
 * const o = { a: 1, b: 2, c: 3 };
 * Object.entries(o) // [string, number][]
 * Object.entries(o) as Entries<typeof o> // ['a' | 'b' | 'c', number][]
 */
export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
