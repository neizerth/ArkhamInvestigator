import { combineReducers, configureStore } from "@reduxjs/toolkit";
const createSagaMiddleware = require("redux-saga").default;
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

export const createStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const store = configureStore({
		reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: false,
			}).concat(sagaMiddleware),
	});

	sagaMiddleware.run(rootSaga);

	const storePersistor = persistStore(store);

	return { store, storePersistor };
};
