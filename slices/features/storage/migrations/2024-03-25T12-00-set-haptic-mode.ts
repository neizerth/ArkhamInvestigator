import type { HapticState } from "@modules/core/haptic/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	haptic?: HapticState;
};

export default function v1(state?: State) {
	if (!state?.haptic) {
		return;
	}

	return {
		...state,
		haptic: {
			...state.haptic,
			hapticMode: "default",
		},
	};
}
