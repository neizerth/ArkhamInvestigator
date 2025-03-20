import {
	type Action,
	type ActionCreator,
	type ThunkAction,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";

import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { persistReducer, persistStore } from "redux-persist";

import { persistStorageConfig } from "@features/storage";
import { serializableCheck } from "./middleware";
import reducers from "./reducer";

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action
>;

export type AppSelector<ReturnType = unknown> = (
	state: RootState,
) => ReturnType;

const rootReducer = combineReducers(reducers);
const reducer = persistReducer(persistStorageConfig, rootReducer);

export const makeStore = () => {
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck,
			}),
		devTools: false,
		enhancers: (getDefaultEnhancers) =>
			getDefaultEnhancers().concat(devToolsEnhancer()),
	});

	const persistor = persistStore(store);

	return {
		persistor,
		store,
	};
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>["store"];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunkCreator = ActionCreator<AppThunk>;

export * from "./features";
export * from "./effects";
