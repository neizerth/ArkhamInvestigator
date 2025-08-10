import { additionalActionAbilityId } from "@modules/board/abilities/shared/config";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

export const selectIsAdditionalActionUsed = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardAbilityUseInfo({
				boardId,
				abilityId: additionalActionAbilityId,
			}),
		],
		(abilityUseInfo) => {
			return Boolean(abilityUseInfo);
		},
	);
