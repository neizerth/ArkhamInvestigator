import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib/util";
import { isNotNil } from "ramda";
import { selectRevealedTokenIds } from "../chaosBagReveal";

export const selectRevealedTokens = createSelector(
	[selectRevealedTokenIds, selectChaosBagContents],
	(tokens, contents) =>
		tokens.map((id) => contents.find(whereId(id))).filter(isNotNil),
);
