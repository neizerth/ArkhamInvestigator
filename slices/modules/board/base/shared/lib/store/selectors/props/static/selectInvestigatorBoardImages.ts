import type { RootState } from "@shared/model";
import { prop } from "ramda";
import { selectInvestigatorBoards } from "../../../board";

export const selectInvestigatorBoardImages = (state: RootState) => {
	const boards = selectInvestigatorBoards(state);
	return boards.map(prop("image"));
};
