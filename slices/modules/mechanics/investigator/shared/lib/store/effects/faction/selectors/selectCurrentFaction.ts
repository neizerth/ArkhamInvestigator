import { selectCurrentBoard } from "@modules/board/base/shared/lib/store/features/board/selectors/find/selectCurrentBoard";
import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentFaction = createSelector(
	[selectCurrentBoard],
	(board) => {
		return board?.currentRole || board?.investigator.faction_code;
	},
);
