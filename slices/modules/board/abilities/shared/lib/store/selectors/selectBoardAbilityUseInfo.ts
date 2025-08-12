import { selectBoardUsedAbilities } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardAbilityUseInfo } from "../getters";

export type SelectAbilityUseInfoOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityUseInfo = ({
	abilityId,
	boardId,
}: SelectAbilityUseInfoOptions) =>
	createSelector([selectBoardUsedAbilities(boardId)], (usedAbilities) => {
		return getBoardAbilityUseInfo({
			abilityId,
			usedAbilities,
		});
	});
