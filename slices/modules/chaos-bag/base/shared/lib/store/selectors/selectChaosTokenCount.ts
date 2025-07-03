import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagContents } from "../chaosBag";

export const selectChaosTokenCount = createSelector(
	[selectChaosBagContents],
	(contents) => contents.length,
);
