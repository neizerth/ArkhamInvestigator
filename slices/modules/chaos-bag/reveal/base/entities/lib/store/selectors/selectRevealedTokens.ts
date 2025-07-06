import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { isNotNil } from "ramda";

export const selectRevealedTokens = createSelector(
	[selectRevealedTokenIds, selectChaosBagContents],
	(tokens, contents) =>
		tokens.map((id) => contents.find(whereId(id))).filter(isNotNil),
);
