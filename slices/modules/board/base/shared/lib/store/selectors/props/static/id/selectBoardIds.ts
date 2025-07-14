import type { RootState } from "@shared/model";
import { prop } from "ramda";
import { selectInvestigatorBoards } from "../../../../board";

export const selectBoardIds = (state: RootState) => {
	const boards = selectInvestigatorBoards(state);
	return boards.map(prop("id"));
};
