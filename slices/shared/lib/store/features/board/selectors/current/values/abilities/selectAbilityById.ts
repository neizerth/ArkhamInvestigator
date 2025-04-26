import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "../../../../../../../util";
import { selectCurrentBoardProp } from "../../props";

export const selectAbilityById = (id: string) =>
	createSelector([selectCurrentBoardProp("investigator")], (investigator) => {
		const { abilities = [] } = investigator;
		return abilities.find(whereId(id));
	});
