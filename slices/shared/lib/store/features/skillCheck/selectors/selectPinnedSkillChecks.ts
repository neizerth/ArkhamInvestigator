import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentBoardProp } from "../../board";

export const selectPinnedSkillChecks = createSelector(
	[selectCurrentBoardProp("checkHistory")],
	(items = []) => items.filter(({ pinned }) => pinned),
);
