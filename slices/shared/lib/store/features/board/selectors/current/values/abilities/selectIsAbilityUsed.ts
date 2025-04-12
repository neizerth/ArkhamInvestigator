import { createSelector } from "@reduxjs/toolkit";
import { selectAbilityUseInfo } from "./current/selectAbilityUseInfo";

export const selectIsAbilityUsed = (abilityId: string, boardId?: number) =>
	createSelector([selectAbilityUseInfo(abilityId)], (data) => {
		if (!data) {
			return false;
		}

		if (!data.boardIds || !boardId) {
			return true;
		}

		return data.boardIds.includes(boardId);
	});
