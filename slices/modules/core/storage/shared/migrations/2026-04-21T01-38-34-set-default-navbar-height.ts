import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	device?: object;
};

export default function v27(state?: State) {
	if (!state) {
		return;
	}

	return {
		...state,
		device: {
			...state.device,
			// Ensure the field exists; actual value will be measured at runtime.
			navbarHeight: 0,
		},
	};
}
