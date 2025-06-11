import type { BoardState } from "@shared/lib";
import type { PersistedState } from "redux-persist";

type State = PersistedState & {
	board?: BoardState;
};

export default function v9(state?: State) {
	if (!state?.board) {
		return;
	}

	return {
		...state,
		board: {
			...state.board,
			tapToHidePins: false,
		},
	};
}
