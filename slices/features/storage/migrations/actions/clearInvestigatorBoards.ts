import type { IBoardState } from "@shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	board?: IBoardState;
};

export const clearInvestigatorBoards = (state?: State) => {
	if (!state?.board) {
		return;
	}
	return {
		...state,
		board: {
			...state.board,
			investigatorBoards: [],
		},
	};
};
