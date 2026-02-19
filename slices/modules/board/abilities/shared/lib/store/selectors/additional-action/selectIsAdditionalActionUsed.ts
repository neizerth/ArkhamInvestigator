import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@shared/model";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

export const selectIsAdditionalActionUsed =
	(boardId: BoardId) => (state: RootState) =>
		select(state, boardId);

const select = createSelector(
	[
		(state, boardId: BoardId) =>
			selectBoardAbilityUseInfo({
				boardId,
				abilityId: additionalActionAbilityId,
			})(state),
	],
	(abilityUseInfo) => {
		return Boolean(abilityUseInfo);
	},
);
