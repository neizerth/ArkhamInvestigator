import { createSelector } from "@reduxjs/toolkit";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";

export const selectSkillCheckHistoryItemTitle = (id: string) =>
	createSelector([selectSkillCheckHistoryItem(id)], (item) => item?.title);
