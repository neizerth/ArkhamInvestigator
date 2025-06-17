export type Single<T extends unknown[]> = T[number];

export type Defined<T> = Exclude<T, undefined>;

export type Nullable<T> = T | null;

export type Values<T> = T[keyof T];

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;
