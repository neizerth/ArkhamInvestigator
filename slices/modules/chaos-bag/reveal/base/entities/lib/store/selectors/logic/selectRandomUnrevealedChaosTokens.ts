import {
	selectChaosBagContents,
	selectRevealedTokenIds,
} from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getRandomChaosTokens } from "../../../logic";

export const selectRandomUnrevealedChaosTokens = (count: number) =>
	createSelector(
		[selectRevealedTokenIds, selectChaosBagContents],
		(revealedIds, contents) => {
			return getRandomChaosTokens({
				revealedIds,
				contents,
				count,
			});
		},
	);
