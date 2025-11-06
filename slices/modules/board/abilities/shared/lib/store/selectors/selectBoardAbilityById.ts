import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import {
	additionalActionAbility,
	additionalActionAbilityId,
} from "../../../config";
import { selectInvestigatorAbilities } from "./selectInvestigatorAbilities";

export type SelectAbilityByIdOptions = {
	boardId: BoardId;
	abilityId: string;
};

export const selectBoardAbilityById = ({
	boardId,
	abilityId,
}: SelectAbilityByIdOptions) =>
	createSelector([selectInvestigatorAbilities(boardId)], (abilities) => {
		if (abilityId === additionalActionAbilityId) {
			return additionalActionAbility;
		}
		return abilities.find(whereId(abilityId));
	});
