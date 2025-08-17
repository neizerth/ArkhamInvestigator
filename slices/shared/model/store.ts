import type {
	Action,
	ActionCreator,
	ActionCreatorWithPayload,
	PayloadAction,
	PayloadActionCreator,
	ThunkAction,
} from "@reduxjs/toolkit";
import type { store } from "../lib/store/store";

export type AppThunk<
	ReturnType = void,
	BasicAction extends Action = Action,
> = ThunkAction<ReturnType, RootState, unknown, BasicAction>;

export type PropwWithState<T> = {
	state: T;
};

export type AppSelector<ReturnType = unknown> = (
	state: RootState,
) => ReturnType;

// Infer the type of makeStore
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkCreator = ActionCreator<AppThunk>;
export type AppActionCreator<T> =
	| ActionCreatorWithPayload<T>
	| ((value: T) => AppThunk);

export type AppActionCreatorWithoutPayload =
	| ActionCreatorWithPayload<void>
	| (() => AppThunk);

export type StateReducer<S, P> = (
	state: S,
	action: PayloadAction<P>,
) => S | void;

export type ActionCreatorPayload<ActionCreator> =
	ActionCreator extends PayloadActionCreator<infer P> ? P : never;
