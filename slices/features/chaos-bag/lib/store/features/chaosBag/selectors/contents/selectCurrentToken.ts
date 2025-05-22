import { createSelector } from "@reduxjs/toolkit";
import { whereId } from "@shared/lib";
import { selectChaosBagContents, selectCurrentTokenId } from "../../chaosBag";

export const selectCurrentToken = createSelector(
	[selectCurrentTokenId, selectChaosBagContents],
	(id, tokens = []) => {
		if (!id) {
			return;
		}

		return tokens.find(whereId(id));
	},
);
