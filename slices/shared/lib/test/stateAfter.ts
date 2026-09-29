import type { UnknownAction } from "@reduxjs/toolkit";

type AnyReducer<State> = (
	state: State | undefined,
	action: UnknownAction,
) => State;

/** Initial state of `reducer` with `actions` applied in order: `stateAfter(reducer, setRole("host"), ...)`. */
export const stateAfter = <State>(
	reducer: AnyReducer<State>,
	...actions: UnknownAction[]
): State =>
	actions.reduce(
		(state, action) => reducer(state, action),
		reducer(undefined, { type: "@@init" }),
	);
