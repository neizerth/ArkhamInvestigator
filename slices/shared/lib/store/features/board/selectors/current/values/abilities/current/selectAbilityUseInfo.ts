import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "../../../../../../../../util";
import { selectCurrentBoardProp } from "../../../props";

export const selectAbilityUseInfo = (id: string) =>
	createSelector([selectCurrentBoardProp("usedAbilities")], (data) =>
		data?.find(whereId(id)),
	);
