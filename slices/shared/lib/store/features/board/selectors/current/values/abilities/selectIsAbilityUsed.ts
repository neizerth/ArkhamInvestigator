import { createSelector } from "@reduxjs/toolkit";
import { selectBoardsCount } from "../../../selectBoardsCount";
import { selectAbilityUseInfo } from "./current/selectAbilityUseInfo";
import { selectAbilityById } from "./selectAbilityById";

export const selectIsAbilityUsed = (abilityId: string, boardId?: number) =>
	createSelector(
		[
			selectAbilityById(abilityId),
			selectAbilityUseInfo(abilityId),
			selectBoardsCount,
		],
		(ability, data, boardsCount) => {
			if (!data) {
				return false;
			}

			if (!ability?.perInvestigator || !data.boardIds) {
				return true;
			}

			if (boardId !== undefined) {
				return data.boardIds.includes(boardId);
			}

			const { personalUse } = ability;

			const maxUses = personalUse ? boardsCount : boardsCount - 1;
			const usesCount = data.boardIds.length;

			return usesCount >= maxUses;
		},
	);
