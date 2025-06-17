import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilities } from "../selectBoardAbilities";
import { selectHaveAdditionalAction } from "./selectHaveAdditionalAction";

export const selectHaveBoardAbilities = (boardId: BoardId) =>
	createSelector(
		[selectHaveAdditionalAction(boardId), selectBoardAbilities(boardId)],
		(additionalAction, abilities) => additionalAction || abilities.length > 0,
	);
