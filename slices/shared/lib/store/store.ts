import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Task } from "redux-saga";

const createSagaMiddleware = require("redux-saga").default;
import { createMigrate, persistReducer, persistStore } from "redux-persist";

import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

import { persistStorageConfig } from "@modules/core/storage/shared/config";
import { persistConfigMigrations } from "@modules/core/storage/shared/migrations";
import reducers from "./reducer";
import rootSaga from "./sagas";

const migrate = createMigrate(
	Object.fromEntries(
		persistConfigMigrations.map((migrate, version) => [version, migrate]),
	),
);

const rootReducer = combineReducers(reducers);
const reducer = persistReducer(
	{
		...persistStorageConfig,
		migrate,
	},
	rootReducer,
);

let sagaTask: Task | null = null;

export const createStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: false,
			}).concat(sagaMiddleware),
		enhancers: (getDefaultEnhancers) =>
			getDefaultEnhancers().concat(devToolsEnhancer()),
	});

	if (sagaTask) {
		console.log("HMR: Stopping old sagas...");
		sagaTask.cancel();
	}

	sagaTask = sagaMiddleware.run(rootSaga);

	const storePersistor = persistStore(store);

	return { store, storePersistor };
};
