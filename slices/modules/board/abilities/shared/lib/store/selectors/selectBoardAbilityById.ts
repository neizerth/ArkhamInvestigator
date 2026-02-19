import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import type { RootState } from "@shared/model";
import {
	additionalActionAbility,
	additionalActionAbilityId,
} from "../../../config";
import { selectInvestigatorAbilities } from "./selectInvestigatorAbilities";

export type SelectAbilityByIdOptions = {
	boardId: BoardId;
	abilityId: string;
};

export const selectBoardAbilityById =
	({ boardId, abilityId }: SelectAbilityByIdOptions) =>
	(state: RootState) =>
		select(state, boardId, abilityId);

const select = createSelector(
	[
		(state, boardId: BoardId) => selectInvestigatorAbilities(boardId)(state),
		(_, _boardId, abilityId: string) => abilityId,
	],
	(abilities, abilityId) => {
		if (abilityId === additionalActionAbilityId) {
			return additionalActionAbility;
		}
		return abilities.find(whereId(abilityId));
	},
);
