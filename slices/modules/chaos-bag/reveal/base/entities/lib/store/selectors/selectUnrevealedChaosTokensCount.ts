import { selectAvailableChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectUnrevealedChaosTokensCount = createSelector(
	[selectRevealedTokenIds, selectAvailableChaosTokens],
	(revealed, contents) => contents.length - revealed.length,
);
