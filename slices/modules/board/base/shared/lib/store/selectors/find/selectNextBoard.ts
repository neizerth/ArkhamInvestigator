import type { RootState } from "@shared/model";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
} from "../../board";

export const selectNextBoard = (state: RootState) => {
	const index = selectCurrentInvestigatorIndex(state);
	const boards = selectInvestigatorBoards(state);

	if (typeof index !== "number" || boards.length === 0) {
		return;
	}
	const nextIndex = (index + 1) % boards.length;

	return boards[nextIndex];
};
