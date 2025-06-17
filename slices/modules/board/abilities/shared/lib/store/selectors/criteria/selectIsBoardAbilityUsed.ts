import {
	selectBoardId,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardAbilityById } from "../selectBoardAbilityById";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

type Options = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardIsAbilityUsed = (options: Options) => {
	const { boardId } = options;
	return createSelector(
		[
			selectBoardAbilityById(options),
			selectBoardAbilityUseInfo(options),
			selectBoardId(boardId),
			selectBoardsCount,
		],
		(ability, data, boardId, boardsCount) => {
			if (!data) {
				return false;
			}

			if (!ability?.perInvestigator || !data.boardIds) {
				return true;
			}

			if (typeof boardId === "number") {
				return data.boardIds.includes(boardId);
			}

			const { personalUse } = ability;

			const maxUses = personalUse ? boardsCount : boardsCount - 1;
			const usesCount = data.boardIds.length;

			return usesCount >= maxUses;
		},
	);
};
