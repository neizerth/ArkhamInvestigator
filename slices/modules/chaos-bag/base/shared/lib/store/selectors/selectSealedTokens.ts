import { createSelector } from "@reduxjs/toolkit";
import { selectChaosBagContents } from "../chaosBag";

export const selectSealedTokens = createSelector(
	[selectChaosBagContents],
	(contents) => contents.filter(({ sealed }) => sealed),
);
