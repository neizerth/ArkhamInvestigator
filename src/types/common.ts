export type Single<T extends unknown[]> = T[number]; 

export type Mapping = Record<string, string>;

export type Nullable<T> = T | null;

export type Defined<T> = Exclude<T, undefined>;

export type OptionalValue<T> = T | undefined;  

export type PickBoolean<T> = {
  [K in keyof T]: T[K] extends OptionalValue<boolean> ? K : never
}