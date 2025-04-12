import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectCurrentBoardProp } from "../../props";

export const selectAbilityById = (id: string) =>
	createSelector([selectCurrentBoardProp("investigator")], (investigator) => {
		const { abilities = [] } = investigator;
		return abilities.find(propEq(id, "id"));
	});
