import { selectOrderedChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getUnrevealedChaosTokens } from "../../logic";

export const selectUnrevealedChaosTokens = createSelector(
	[selectRevealedTokenIds, selectOrderedChaosBagContents],
	(revealedIds, contents) =>
		getUnrevealedChaosTokens({
			revealedIds,
			contents,
		}),
);
