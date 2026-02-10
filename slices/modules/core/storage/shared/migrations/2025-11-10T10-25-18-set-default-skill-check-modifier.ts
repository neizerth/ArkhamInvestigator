import type { ChaosBagRevealState } from "@modules/chaos-bag/reveal/base/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	chaosBagReveal?: ChaosBagRevealState;
};

export default function setDefaultSkillCheckModifier(state?: State) {
	if (!state?.chaosBagReveal) {
		return state;
	}

	return {
		...state,
		chaosBagReveal: {
			...state.chaosBagReveal,
			skillCheckModifier: 0,
		},
	};
}
