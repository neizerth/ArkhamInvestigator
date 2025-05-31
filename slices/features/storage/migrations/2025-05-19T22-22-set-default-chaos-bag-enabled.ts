import type { PersistedState } from "redux-persist";
import type { IChaosBagState } from "../../game/chaos-bag";

type State = PersistedState & {
	chaosBag?: IChaosBagState;
};

export default function v11(state?: State) {
	if (!state?.chaosBag) {
		return;
	}

	return {
		...state,
		chaosBag: {
			...state.chaosBag,
			enabled: true,
		},
	};
}
