import { createSelector } from "@reduxjs/toolkit";
import { isBoardAbility } from "../../../../../../../../features/game/investigators/abilities";
import { selectBoardsCount } from "../../../../selectBoardsCount";
import { selectCurrentBoardProp } from "../../../props";

export const selectBoardAbilities = createSelector(
	[selectCurrentBoardProp("investigator"), selectBoardsCount],
	(investigator, count) => {
		if (!investigator) {
			return [];
		}
		const { abilities = [] } = investigator;
		return abilities
			.filter(isBoardAbility)
			.filter(
				(ability) =>
					!ability.perInvestigator || ability.personalUse || count > 1,
			);
	},
);
