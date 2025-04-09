import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectBoardProp } from "../../props";

export const selectAbilityUseInfo = (id: string) =>
	createSelector([selectBoardProp("usedAbilities")], (data) =>
		data?.find(propEq(id, "id")),
	);
