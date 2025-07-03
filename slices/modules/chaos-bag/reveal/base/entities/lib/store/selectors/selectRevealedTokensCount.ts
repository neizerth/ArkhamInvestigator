import { createSelector } from "@reduxjs/toolkit";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectRevealedTokensCount = createSelector(
	[selectRevealedTokens],
	(tokens) => tokens.length || 0,
);
