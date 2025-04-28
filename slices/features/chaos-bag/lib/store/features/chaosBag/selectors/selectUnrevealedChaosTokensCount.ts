import { createSelector } from "@reduxjs/toolkit";
import { selectRevealedTokenIds } from "../chaosBag";
import { selectCurrentChaosBagContents } from "./selectCurrentChaosBagContents";

export const selectUnrevealedChaosTokensCount = createSelector(
	[selectRevealedTokenIds, selectCurrentChaosBagContents],
	(revealed, contents) => contents.length - revealed.length,
);
