import type { ChaosBagState } from "@modules/chaos-bag/base/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	chaosBag?: ChaosBagState;
};

export default function addSealedContents(state?: State) {
	if (!state?.chaosBag) {
		return;
	}

	return {
		...state,
		chaosBag: {
			...state.chaosBag,
			sealedContents: [],
			sealedTokenCount: {},
		},
	};
}
