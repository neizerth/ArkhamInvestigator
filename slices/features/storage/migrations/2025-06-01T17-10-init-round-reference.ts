import type { IBoardState } from "@shared/lib";
import type { PersistedState } from "redux-persist";
import type { IRulesState } from "../../game/rules";

type State = PersistedState & {
	rules?: IRulesState;
	board?: IBoardState;
};

export default function v16(state?: State) {
	if (!state?.rules || !state.board) {
		return;
	}

	return {
		...state,
		rules: {
			...state.rules,
			rules: [],
			openTimingPhases: [],
			timingWizardPhaseId: null,
			timingWizardActive: false,
		},
		board: {
			...state.board,
			investigatorBoards: [],
			showUpkeepResources: false,
		},
	};
}
