import type { BoardState } from "@modules/board/base/shared/lib";
import type { RulesState } from "@modules/mechanics/rules/base/shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	rules?: RulesState;
	board?: BoardState;
};

export default function initRoundReference(state?: State) {
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
