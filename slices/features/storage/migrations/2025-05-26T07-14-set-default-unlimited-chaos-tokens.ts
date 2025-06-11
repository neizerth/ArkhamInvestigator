import type { PersistedState } from "redux-persist";
import type { ChaosBagState } from "../../game/chaos-bag";

type State = PersistedState & {
	chaosBag?: ChaosBagState;
};

export default function v15(state?: State) {
	if (!state?.chaosBag) {
		return;
	}

	return {
		...state,
		chaosBag: {
			...state.chaosBag,
			unlimitedChaosTokens: false,
		},
	};
}
