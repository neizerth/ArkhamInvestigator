import type { PersistedState } from "redux-persist";
import type { IChaosBagState } from "../../chaos-bag";

type State = PersistedState & {
	chaosBag?: IChaosBagState;
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
