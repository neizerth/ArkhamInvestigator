import { createSelector } from "@reduxjs/toolkit";
import type { SkillCheckHistoryItem } from "@shared/model";
import { propEq } from "ramda";
import { selectCurrentBoardProp } from "../../board";

export const selectSkillCheckHistoryItem = (id: string) =>
	createSelector(
		[selectCurrentBoardProp("checkHistory")],
		(history) => history.find(propEq(id, "id")) as SkillCheckHistoryItem,
	);
