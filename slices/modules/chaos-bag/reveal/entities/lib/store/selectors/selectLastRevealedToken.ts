import { createSelector } from "@reduxjs/toolkit";
import { last } from "ramda";
import { selectRevealedTokens } from "./selectRevealedTokens";

export const selectLastRevealedToken = createSelector(
	[selectRevealedTokens],
	(tokens) => last(tokens),
);
