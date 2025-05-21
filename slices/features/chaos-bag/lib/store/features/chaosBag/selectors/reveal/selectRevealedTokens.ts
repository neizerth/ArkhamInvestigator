import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { isNotNil } from "ramda";
import { selectChaosBagContents, selectRevealedTokenIds } from "../../chaosBag";

export const selectRevealedTokens = createSelector(
	[selectRevealedTokenIds, selectChaosBagContents],
	(tokens, contents) =>
		tokens.map((id) => contents.find(whereId(id))).filter(isNotNil),
);
