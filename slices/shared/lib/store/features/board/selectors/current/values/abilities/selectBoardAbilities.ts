import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { isBoardAbility } from "../../../../../../../features/game/investigators/abilities";
import { selectBoardProp } from "../../../props";
import { selectBoardsCount } from "../../../selectBoardsCount";

export const selectBoardAbilities = (boardId: BoardId) =>
	createSelector(
		[selectBoardProp(boardId, "investigator"), selectBoardsCount],
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
