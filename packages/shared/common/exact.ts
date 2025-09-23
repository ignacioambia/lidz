/**
 * Ensures type U is exactly the same as type T.
 * Prevents excess or missing properties.
 */
export type Exact<T, U> = U extends T ? (T extends U ? U : never) : never;
