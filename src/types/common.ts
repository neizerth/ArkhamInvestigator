export type Single<T extends unknown[]> = T[number]; 

export type Mapping = Record<string, string>;

export type Nullable<T> = T | null;