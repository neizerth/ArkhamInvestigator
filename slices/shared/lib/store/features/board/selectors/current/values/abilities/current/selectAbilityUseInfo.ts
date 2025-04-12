import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectCurrentBoardProp } from "../../../props";

export const selectAbilityUseInfo = (id: string) =>
	createSelector([selectCurrentBoardProp("usedAbilities")], (data) =>
		data?.find(propEq(id, "id")),
	);
