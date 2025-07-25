import { selectOrderedChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectAvailableChaosTokens = createSelector(
	[selectOrderedChaosBagContents],
	(contents) => contents.filter(({ sealed }) => !sealed),
);
