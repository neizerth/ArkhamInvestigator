import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { selectBoardUsedAbilities } from "./static";

export type SelectAbilityUseInfoOptions = {
	abilityId: string;
	boardId: BoardId;
};

export const selectBoardAbilityUseInfo = ({
	abilityId,
	boardId,
}: SelectAbilityUseInfoOptions) =>
	createSelector([selectBoardUsedAbilities(boardId)], (data) =>
		data?.find(whereId(abilityId)),
	);
