import { createSelector } from "@reduxjs/toolkit";
import type { BoardId } from "@shared/model";
import { isBoardAbility } from "../../../../../../../features";
import { selectBoardProp } from "../../../props";
import { selectBoardsCount } from "../../../selectBoardsCount";

export const selectBoardAbilities = (boardId: BoardId) =>
	createSelector(
		[selectBoardProp(boardId, "investigator"), selectBoardsCount],
		(investigator, investigatorsCount) => {
			if (!investigator) {
				return [];
			}
			const { abilities = [] } = investigator;
			return abilities.filter((ability) =>
				isBoardAbility({
					ability,
					investigatorsCount,
				}),
			);
		},
	);
