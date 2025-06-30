import { createSelector } from "@reduxjs/toolkit";
import { selectOrderedChaosBagContents } from "./selectOrderedChaosBagContents";

export const selectSealedChaosTokens = createSelector(
	[selectOrderedChaosBagContents],
	(contents) => contents.filter(({ sealed }) => sealed),
);
