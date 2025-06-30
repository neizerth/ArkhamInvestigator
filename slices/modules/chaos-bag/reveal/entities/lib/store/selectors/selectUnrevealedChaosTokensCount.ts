import { selectAvailableChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectRevealedTokenIds } from "../../../../../base/shared/lib/store/chaosBag";

export const selectUnrevealedChaosTokensCount = createSelector(
	[selectRevealedTokenIds, selectAvailableChaosTokens],
	(revealed, contents) => contents.length - revealed.length,
);
