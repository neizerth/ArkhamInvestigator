import type { BoardHandler } from "@modules/board/base/shared/model";

export const handleClearBoards: BoardHandler = (state) => {
	state.doom = 0;
	state.clues = 0;
	state.resources = 0;
	state.currentInvestigatorIndex = 0;
	state.showDescription = false;

	state.investigatorBoards = [];
};
