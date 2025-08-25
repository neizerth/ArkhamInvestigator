import type { PersistedState } from "redux-persist";

type State = PersistedState;

export default function v0(state?: State) {
	if (!state) {
		return;
	}

	return {
		...state,
	};
}
