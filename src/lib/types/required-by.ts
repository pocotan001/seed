/**
 * Makes the given keys required
 */
export type RequiredBy<T, K extends keyof T> = T & { [P in K]-?: T[P] };
