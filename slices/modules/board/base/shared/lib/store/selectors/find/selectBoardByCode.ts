import type { RootState } from "@shared/model";
import { selectInvestigatorBoards } from "../../board";

export const selectBoardByCode = (code: string) => (state: RootState) => {
	const boards = selectInvestigatorBoards(state);
	return boards.find(({ investigator }) => investigator.code === code);
};
