import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { isRevealedTokenActive } from "@modules/chaos-bag/result/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { prop } from "ramda";
import { selectRevealedTokens } from "../chaosBagReveal";

export const selectAvailableTokens = createSelector(
	[selectChaosBagContents, selectRevealedTokens],
	(contents, revealedTokens) => {
		const availableTokens = revealedTokens.filter(isRevealedTokenActive);
		const availableIds = availableTokens.map(prop("id"));

		return contents.filter(({ id }) => !availableIds.includes(id));
	},
);
