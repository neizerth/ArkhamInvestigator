import { createSelector } from "@reduxjs/toolkit";
import type { SkillCheckHistoryItem } from "@shared/model";
import { whereId } from "../../../../../util";
import { selectCurrentBoardProp } from "../../../board";

export const selectSkillCheckHistoryItem = (id: string) =>
	createSelector(
		[selectCurrentBoardProp("checkHistory")],
		(history) => history.find(whereId(id)) as SkillCheckHistoryItem,
	);
