import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { selectHasAdditionalAction } from "../additional-action/selectHasAdditionalAction";
import { selectBoardAbilities } from "../selectBoardAbilities";

export const selectHasBoardAbilities =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		(state, boardId: BoardId) => selectHasAdditionalAction(boardId)(state),
		(state, boardId: BoardId) => selectBoardAbilities(boardId)(state),
	],
	(additionalAction, abilities) => {
		return additionalAction || abilities.length > 0;
	},
);
