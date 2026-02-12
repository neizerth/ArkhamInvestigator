import { call, delay } from "redux-saga/effects";

/**
 * Same as `call(fn, ...args)` but runs repeatedly with the given interval in ms.
 */
export function callEvery<Fn extends (...args: unknown[]) => unknown>(
	ms: number,
	fn: Fn,
	...args: Parameters<Fn>
): Generator;

/**
 * Same as `call([context, fn], ...args)` but runs repeatedly with the given interval.
 */
export function callEvery<
	Ctx extends { [P in Name]: (this: Ctx, ...args: unknown[]) => unknown },
	Name extends string,
>(
	ms: number,
	ctxAndFnName: [Ctx, Name],
	...args: Parameters<Ctx[Name]>
): Generator;

/**
 * Same as `call({ context, fn }, ...args)` but runs repeatedly with the given interval.
 */
export function callEvery<
	Ctx extends { [P in Name]: (this: Ctx, ...args: unknown[]) => unknown },
	Name extends string,
>(
	ms: number,
	ctxAndFnName: { context: Ctx; fn: Name },
	...args: Parameters<Ctx[Name]>
): Generator;

/**
 * Same as `call([context, fn], ...args)` but runs repeatedly with the given interval.
 */
export function callEvery<
	Ctx,
	Fn extends (this: Ctx, ...args: unknown[]) => unknown,
>(ms: number, ctxAndFn: [Ctx, Fn], ...args: Parameters<Fn>): Generator;

/**
 * Same as `call({ context, fn }, ...args)` but runs repeatedly with the given interval.
 */
export function callEvery<
	Ctx,
	Fn extends (this: Ctx, ...args: unknown[]) => unknown,
>(
	ms: number,
	ctxAndFn: { context: Ctx; fn: Fn },
	...args: Parameters<Fn>
): Generator;

export function* callEvery(
	ms: number,
	fnOrCtxAndFn: unknown,
	...args: unknown[]
): Generator {
	while (true) {
		yield call(fnOrCtxAndFn as never, ...args);
		yield delay(ms);
	}
}
