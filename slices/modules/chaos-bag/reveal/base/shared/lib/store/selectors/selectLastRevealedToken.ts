import { createSelector } from "@reduxjs/toolkit";
import { last } from "ramda";
import { selectRevealedTokens } from "../chaosBagReveal";

export const selectLastRevealedToken = createSelector(
	[selectRevealedTokens],
	(tokens) => last(tokens),
);
