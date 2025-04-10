import { createSelector } from "@reduxjs/toolkit";
import { isBoardAbility } from "../../../../../../../features/game/investigators/abilities";
import { selectBoardProp } from "../../props";

export const selectBoardAbilities = createSelector(
	[selectBoardProp("abilities")],
	(abilities = []) => {
		return abilities.filter(isBoardAbility);
	},
);
