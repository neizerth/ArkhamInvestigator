import type { Action, Reducer } from "@reduxjs/toolkit";
import { type Saga, runSaga, stdChannel } from "redux-saga";

type Responder = (action: Action) => Action | Action[] | undefined;

type SagaTesterOptions<State> = {
	reducer?: Reducer<State>;
	state?: State;
};

/**
 * Runs sagas against a real reducer without a store and records every dispatched action.
 * `respond` emulates other sagas or native modules: it answers matching actions asynchronously.
 */
export const createSagaTester = <State = Record<string, unknown>>({
	reducer,
	state,
}: SagaTesterOptions<State> = {}) => {
	const channel = stdChannel<Action>();
	const actions: Action[] = [];
	const responders: Responder[] = [];
	let currentState = (state ??
		reducer?.(undefined, { type: "@@init" })) as State;

	const dispatch = (action: Action) => {
		actions.push(action);

		if (reducer) {
			currentState = reducer(currentState, action);
		}

		channel.put(action);

		for (const responder of responders) {
			const response = responder(action);

			if (!response) {
				continue;
			}

			const responses = Array.isArray(response) ? response : [response];

			Promise.resolve().then(() => {
				for (const item of responses) {
					dispatch(item);
				}
			});
		}
	};

	const run = <Args extends unknown[]>(saga: Saga<Args>, ...args: Args) =>
		runSaga(
			{
				channel,
				dispatch,
				getState: () => currentState,
			},
			saga,
			...args,
		);

	const respond = (responder: Responder) => {
		responders.push(responder);
	};

	const ofType = (type: string) =>
		actions.filter((action) => action.type === type);

	return {
		run,
		dispatch,
		respond,
		actions,
		ofType,
		getState: () => currentState,
	};
};

/** Lets pending promises and saga continuations settle. */
export const flush = async (times = 10) => {
	for (let i = 0; i < times; i++) {
		await Promise.resolve();
	}
};
