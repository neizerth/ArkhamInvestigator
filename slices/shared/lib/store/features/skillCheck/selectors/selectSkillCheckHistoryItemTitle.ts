import { createSelector } from "@reduxjs/toolkit";
import { selectSkillCheckHistoryItem } from "./selectSkillCheckHistoryItem";

export const selectIsSkillCheckHistoryItemPinned = (id: string) =>
	createSelector([selectSkillCheckHistoryItem(id)], (item) =>
		Boolean(item?.pinned),
	);
