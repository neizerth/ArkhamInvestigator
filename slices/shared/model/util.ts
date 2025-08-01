export type Single<T extends unknown[]> = T[number];

export type Defined<T> = Exclude<T, undefined>;

export type Nullable<T> = T | null;

export type Values<T> = T[keyof T];

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

export type SafeOmit<T, Keys> = {
	[K in keyof T as K extends Keys ? never : K]: T[K];
};

export type RequiredKeys<T, Keys extends keyof T> = Omit<T, Keys> &
	Required<Pick<T, Keys>>;

export type PickPartial<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>;

export type PickRequired<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;

export type MaybeData<T> = T extends void ? Record<string, never> : { data: T };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type GenericFunction = (...args: any) => any;

export type ReturnAwaited<T extends GenericFunction> = Awaited<ReturnType<T>>;

export type MaybePromise<T> = T | Promise<T>;
