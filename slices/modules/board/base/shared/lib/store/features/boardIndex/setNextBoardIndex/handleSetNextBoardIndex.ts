import type { BoardHandler } from "@modules/board/base/shared/model";

export const handleSetPrevBoardIndexIndex: BoardHandler = (state, payload) => {
	const { length } = state.investigatorBoards;

	const index = state.currentInvestigatorIndex ?? 0;

	if (index < 0 || length < 2) {
		return;
	}
	const nextIndex = (index + 1) % length;

	state.currentInvestigatorIndex = nextIndex;
};
