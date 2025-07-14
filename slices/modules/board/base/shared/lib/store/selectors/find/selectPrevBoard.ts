import type { RootState } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";

export const selectPrevBoard = (state: RootState) => {
	const index = selectCurrentInvestigatorIndex(state);
	const boards = selectInvestigatorBoards(state);

	if (typeof index !== "number") {
		return;
	}
	const prevIndex = Math.max(0, index - 1);

	return boards[prevIndex];
};
