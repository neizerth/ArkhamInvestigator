import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectCurrentBoardProp } from "../../props";

export const selectAbilityById = (id: string) =>
	createSelector([selectCurrentBoardProp("details")], (details) => {
		const abilities = details.media?.abilities || [];

		return abilities.find(propEq(id, "id"));
	});
