import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import { selectBoardAbilities } from "./selectBoardAbilities";

export type SelectAbilityByIdOptions = {
	boardId: BoardId;
	abilityId: string;
};

export const selectBoardAbilityById = ({
	boardId,
	abilityId,
}: SelectAbilityByIdOptions) =>
	createSelector([selectBoardAbilities(boardId)], (abilities) => {
		return abilities.find(whereId(abilityId));
	});
