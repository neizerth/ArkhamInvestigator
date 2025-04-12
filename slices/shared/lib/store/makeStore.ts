import { combineReducers, configureStore } from "@reduxjs/toolkit";

import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { createMigrate, persistReducer, persistStore } from "redux-persist";

import {
	persistConfigMigrations,
	persistStorageConfig,
} from "../../../features/storage";
import { serializableCheck } from "./middleware";
import reducers from "./reducer";

const rootReducer = combineReducers(reducers);
const reducer = persistReducer(
	{
		...persistStorageConfig,
		migrate: createMigrate(persistConfigMigrations),
	},
	rootReducer,
);

export const makeStore = () => {
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
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
