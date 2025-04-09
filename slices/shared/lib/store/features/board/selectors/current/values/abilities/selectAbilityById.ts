import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectBoardProp } from "../../props";

export const selectAbilityById = (id: string) =>
	createSelector([selectBoardProp("details")], (details) => {
		const abilities = details.media?.abilities || [];

		return abilities.find(propEq(id, "id"));
	});
