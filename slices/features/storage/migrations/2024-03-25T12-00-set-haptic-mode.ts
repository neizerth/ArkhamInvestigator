import type { IHapticState } from "@modules/core/haptic/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	haptic?: IHapticState;
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
