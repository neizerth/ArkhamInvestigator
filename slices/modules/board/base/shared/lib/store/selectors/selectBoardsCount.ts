import type { RootState } from "@shared/model";
import { selectInvestigatorBoards } from "../board";

export const selectBoardsCount = (state: RootState) => {
	const boards = selectInvestigatorBoards(state) || [];
	return boards.length;
};
