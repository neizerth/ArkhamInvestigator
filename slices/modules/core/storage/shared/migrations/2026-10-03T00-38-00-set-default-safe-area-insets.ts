import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	device?: object;
};

export default function setDefaultSafeAreaInsets(state?: State) {
	if (!state) {
		return;
	}

	return {
		...state,
		device: {
			...state.device,
			// Ensure the field exists; actual value will be measured at runtime.
			safeAreaInsets: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			},
		},
	};
}
