import type { ChaosOddsState } from "@modules/chaos-bag/odds/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	chaosOdds?: ChaosOddsState;
};

export default function v26(state?: State) {
	if (!state) {
		return;
	}

	return {
		...state,
		chaosOdds: {
			...(state.chaosOdds ?? {}),
			minSkillOddsValue: state.chaosOdds?.minSkillOddsValue ?? 0,
		},
	};
}
