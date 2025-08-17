import { combineReducers, configureStore } from "@reduxjs/toolkit";
const createSagaMiddleware = require("redux-saga").default;

import devToolsEnhancer from "redux-devtools-expo-dev-plugin";
import { createMigrate, persistReducer, persistStore } from "redux-persist";

import { persistStorageConfig } from "@modules/core/storage/shared/config";
import { persistConfigMigrations } from "@modules/core/storage/shared/migrations";
import reducers from "./reducer";
import rootSaga from "./sagas";

const rootReducer = combineReducers(reducers);
const reducer = persistReducer(
	{
		...persistStorageConfig,
		migrate: createMigrate(persistConfigMigrations),
	},
	rootReducer,
);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(sagaMiddleware),
	devTools: false,
	enhancers: (getDefaultEnhancers) =>
		getDefaultEnhancers().concat(devToolsEnhancer()),
});

sagaMiddleware.run(rootSaga);

export const storePersistor = persistStore(store);
