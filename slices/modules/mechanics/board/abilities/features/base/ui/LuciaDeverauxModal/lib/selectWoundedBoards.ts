import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import {
	getBoardDamage,
	getBoardHorror,
} from "@modules/mechanics/board/base/entities/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectWoundedBoards = createSelector(
	[selectInvestigatorBoards],
	(boards) => {
		return boards
			.map((board) => ({
				id: board.id,
				damage: getBoardDamage(board),
				horror: getBoardHorror(board),
			}))
			.filter((board) => board.damage > 0 || board.horror > 0);
	},
);
