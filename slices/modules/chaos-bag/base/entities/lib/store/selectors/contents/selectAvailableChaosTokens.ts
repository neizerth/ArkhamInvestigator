import { createSelector } from "@reduxjs/toolkit";
import { selectOrderedChaosBagContents } from "./selectOrderedChaosBagContents";

export const selectAvailableChaosTokens = createSelector(
	[selectOrderedChaosBagContents],
	(contents) => contents.filter(({ sealed }) => !sealed),
);
