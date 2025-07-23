import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectRevealedTokens } from "../chaosBagReveal";

export const selectRevealedTokenIds = createSelector(
	[selectRevealedTokens],
	(tokens) => tokens.map(prop("id")),
);
