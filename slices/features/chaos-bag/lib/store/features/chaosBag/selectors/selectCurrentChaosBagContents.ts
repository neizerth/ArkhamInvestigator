import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagContents } from "../chaosBag";

export const selectCurrentChaosBagContents = createSelector(
	[selectChaosBagContents],
	(contents) => contents.filter(({ sealed }) => !sealed),
);
