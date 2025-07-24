import {
	selectCurrentRevealedTokenId,
	selectRevealedTokens,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { last } from "ramda";

export const selectCurrentRevealedToken = createSelector(
	[selectRevealedTokens, selectCurrentRevealedTokenId],
	(tokens, id) => {
		const lastToken = last(tokens);
		if (typeof id !== "string") {
			return lastToken;
		}
		const currentToken = tokens.find(whereId(id));
		return currentToken || lastToken;
	},
);
