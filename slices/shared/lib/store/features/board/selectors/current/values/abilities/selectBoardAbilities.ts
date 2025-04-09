import { createSelector } from "@reduxjs/toolkit";
import { isBoardAbility } from "../../../../../../../features/game/investigators/abilities";
import { selectBoardProp } from "../../props";

export const selectBoardAbilities = createSelector(
	[selectBoardProp("details")],
	(details) => {
		const abilities = details.media?.abilities || [];

		return abilities.filter(isBoardAbility);
	},
);
