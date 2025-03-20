export type Single<T extends unknown[]> = T[number];

export type Defined<T extends undefined> = Exclude<T, undefined>;

export type Nullable<T> = T | null;
