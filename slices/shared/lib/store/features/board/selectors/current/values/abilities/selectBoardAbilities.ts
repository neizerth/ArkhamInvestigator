import { createSelector } from "@reduxjs/toolkit";
import { isBoardAbility } from "../../../../../../../features/game/investigators/abilities";
import { selectCurrentBoardProp } from "../../props";

export const selectBoardAbilities = createSelector(
	[selectCurrentBoardProp("abilities")],
	(abilities = []) => {
		return abilities.filter(isBoardAbility);
	},
);
