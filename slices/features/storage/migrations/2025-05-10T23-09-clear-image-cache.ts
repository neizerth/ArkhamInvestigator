import { Image } from "expo-image";
import type { PersistedState } from "redux-persist";

type State = PersistedState;

export default function v7(state?: State) {
	if (!state) {
		return;
	}

	Image.clearDiskCache();
	Image.clearMemoryCache();

	return {
		...state,
	};
}
