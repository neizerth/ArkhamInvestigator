import type { PersistedState } from "redux-persist";
import type { IHapticState } from "../../haptic";

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
