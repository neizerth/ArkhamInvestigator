import type { ActionPattern } from "@redux-saga/types";
import { call, fork, take } from "redux-saga/effects";

// biome-ignore lint/suspicious/noExplicitAny: worker args are checked by the caller like in `takeEvery`
type Worker = (...args: any[]) => unknown;

/**
 * Same as `takeEvery(pattern, worker, ...args)` but handles only the first matching action.
 */
export const takeOnce = (
	pattern: ActionPattern,
	worker: Worker,
	...args: unknown[]
) =>
	fork(function* () {
		const action: unknown = yield take(pattern);
		yield call(worker, ...args, action);
	});
