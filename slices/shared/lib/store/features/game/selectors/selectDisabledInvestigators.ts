import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import type { RootState } from "@shared/model";
import { prop } from "ramda";
import { selectReplaceCode } from "./selectReplaceCode";

export const selectDisabledInvestigators = (state: RootState) => {
	const replaceCode = selectReplaceCode(state);
	const boards = selectInvestigatorBoards(state);
	if (!replaceCode) {
		return [];
	}
	return boards
		.filter(({ investigator }) => {
			return !investigator.multiselect && investigator.code !== replaceCode;
		})
		.map(prop("investigator"));
};
