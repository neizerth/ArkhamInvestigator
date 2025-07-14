import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import type { RootState } from "@shared/model";
import { selectReplaceInvestigator } from "../game";

export const selectReplaceCode = (state: RootState) => {
	const board = selectCurrentBoard(state);
	const replace = selectReplaceInvestigator(state);
	return replace && board?.signatureGroupId;
};
