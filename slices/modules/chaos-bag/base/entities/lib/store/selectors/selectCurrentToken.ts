import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectCurrentRevealedTokenId } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";

export const selectCurrentToken = createSelector(
	[selectCurrentRevealedTokenId, selectChaosBagContents],
	(id, tokens = []) => {
		if (!id) {
			return;
		}

		return tokens.find(whereId(id));
	},
);
