import type { BoardHandler } from "@modules/board/base/shared/model";

export const handleSetPrevBoardIndex: BoardHandler = (state) => {
	const { length } = state.investigatorBoards;

	const index = state.currentInvestigatorIndex ?? 0;

	if (index < 0 || length < 2) {
		return;
	}
	const prevIndex = index === 0 ? length - 1 : index - 1;

	state.currentInvestigatorIndex = prevIndex;
};
