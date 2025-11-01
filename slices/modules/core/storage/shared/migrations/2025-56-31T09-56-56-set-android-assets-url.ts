import type { ThemeState } from "@modules/core/theme/shared/lib";
import { ASSET_URL } from "@shared/config";
import { Platform } from "react-native";
import type { PersistedState } from "redux-persist";

const ios = Platform.OS === "ios";

type State = PersistedState & {
	theme?: ThemeState;
};

export default function v23(state?: State) {
	if (!state?.theme || ios) {
		return;
	}

	return {
		...state,
		theme: {
			...state.theme,
			artworkUrl: ASSET_URL,
		},
	};
}
