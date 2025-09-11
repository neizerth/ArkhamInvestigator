import { createStore } from "@shared/lib/store/store";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { store, storePersistor } = createStore();

export const StoreProvider = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={storePersistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};
