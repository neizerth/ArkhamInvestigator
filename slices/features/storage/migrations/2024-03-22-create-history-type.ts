import type { IBoardState, RootState } from "@shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	board?: IBoardState;
};

export default function v0(state?: State) {
	if (!state?.board) {
		return;
	}

	return {
		...state,
		board: {
			...state.board,
			boards: state.board.investigatorBoards.map((board) => ({
				...board,
				history: [],
				historyIndex: 0,
			})),
		},
	};
}
