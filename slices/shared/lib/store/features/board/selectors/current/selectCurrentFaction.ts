import { createSelector } from "@reduxjs/toolkit";
import type { Faction } from "@shared/model";
import { selectCurrentBoard } from "./selectCurrentBoard";

export const selectCurrentFaction = createSelector(
	[selectCurrentBoard],
	(board) => {
		return board.investigator.faction_code as Faction;
	},
);
