import type {
	Action,
	ActionCreator,
	ActionCreatorWithPayload,
	PayloadAction,
	ThunkAction,
} from "@reduxjs/toolkit";
import type { makeStore } from "../lib/store/makeStore";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

export type PropwWithState<T> = {
	state: T;
};

export type AppSelector<ReturnType = unknown> = (
	state: RootState,
) => ReturnType;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>["store"];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkCreator = ActionCreator<AppThunk>;
export type AppActionCreator<T> =
	| ActionCreatorWithPayload<T>
	| ((value: T) => AppThunk);

export type StateReducer<S, P> = (
	state: S,
	action: PayloadAction<P>,
) => S | void;
