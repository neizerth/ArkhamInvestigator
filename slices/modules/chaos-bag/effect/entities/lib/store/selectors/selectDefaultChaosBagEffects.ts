import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokens } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getDefaultChaosBagEffects } from "../../effects";

export const selectDefaultChaosBagEffects = createSelector(
	[selectChaosBagContents, selectRevealedTokens],
	(tokens, revealedTokens) => {
		return getDefaultChaosBagEffects({ tokens, revealedTokens });
	},
);
