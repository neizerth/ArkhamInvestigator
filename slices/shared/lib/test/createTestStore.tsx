import { modulesReducer } from "@modules/reducer";
import {
	combineReducers,
	configureStore,
	createNextState,
} from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { render } from "@testing-library/react-native";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import type { Saga } from "redux-saga";

const createSagaMiddleware = require("redux-saga").default;

export type TestStoreOptions = {
	/** mutates the initial state (immer draft) */
	patch?: (state: RootState) => void;
	/** only the sagas the test needs: the root saga starts network, assets, etc. */
	saga?: Saga;
};

/** Real module reducers without persistence: components read state through real selectors */
export const createTestStore = ({ patch, saga }: TestStoreOptions = {}) => {
	const reducer = combineReducers(modulesReducer);
	const initialState = reducer(undefined, { type: "@@test/INIT" }) as RootState;
	const preloadedState = patch
		? createNextState(initialState, patch)
		: initialState;

	const sagaMiddleware = createSagaMiddleware();

	const store = configureStore({
		reducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				immutableCheck: false,
				serializableCheck: false,
			}).concat(sagaMiddleware),
	});

	if (saga) {
		sagaMiddleware.run(saga);
	}

	// persistence is off: no `_persist` key, selectors still see the RootState shape
	return store as Omit<typeof store, "getState"> & {
		getState: () => RootState;
	};
};

export type TestStore = ReturnType<typeof createTestStore>;

export const renderWithStore = async (
	element: ReactElement,
	options?: TestStoreOptions,
) => {
	const store = createTestStore(options);
	const view = await render(<Provider store={store}>{element}</Provider>);

	return { ...view, store };
};
