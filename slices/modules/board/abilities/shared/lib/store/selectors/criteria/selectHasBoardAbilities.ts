import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectHasAdditionalAction } from "../additional-action/selectHasAdditionalAction";
import { selectBoardAbilities } from "../selectBoardAbilities";

export const selectHasBoardAbilities = (boardId: BoardId) =>
	createSelector(
		[selectHasAdditionalAction(boardId), selectBoardAbilities(boardId)],
		(additionalAction, abilities) => additionalAction || abilities.length > 0,
	);
