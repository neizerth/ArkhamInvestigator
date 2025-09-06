import {
	selectBoardId,
	selectBoardsCount,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { always } from "ramda";
import { getIsAbilityUsed } from "../../getters/getIsAbilityUsed";
import { selectBoardAbilityById } from "../selectBoardAbilityById";
import { selectBoardAbilityUseInfo } from "../selectBoardAbilityUseInfo";

type Options = {
	abilityId: string;
	boardId: BoardId;
	abilityTargetBoardId?: BoardId;
};

const emptyId = always(void 0);

export const selectIsBoardAbilityUsed = (options: Options) => {
	const { abilityTargetBoardId } = options;

	return createSelector(
		[
			selectBoardAbilityById(options),
			selectBoardAbilityUseInfo(options),
			abilityTargetBoardId ? selectBoardId(abilityTargetBoardId) : emptyId,
			selectBoardsCount,
		],
		(ability, usedAbility, targetBoardId, boardsCount) => {
			return getIsAbilityUsed({
				ability,
				usedAbility,
				targetBoardId,
				boardsCount,
			});
		},
	);
};
